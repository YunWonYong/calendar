import { consoleLogger } from "@/analytics/logger/console";
import config from "@/config";
import { METHODS } from "@/domains/fetch/fetchConstants";
import { API_TIMEOUT_ERROR_CODE, REFRESH_TOKEN_API_TIMEOUT_ERROR_CODE } from "@/domains/server/serverType";
import { getAbortController, request } from "@/lib/fetch";
import { isNullOrUndefined } from "@/lib/validation/validation";

import type { AuthTokenInfo } from "@/domains/auth/authTypes";
import type { ApiResponse, ErrorCodeData, HttpMethod } from "@/domains/fetch/fetchType";
import type { AutoLoginRequestBody, LoginApiType, LoginRequestBody, LoginResponseBody, LogoutRequestBody, RefreshAuthTokenRequestBody, ServerApiClientAuthUserInfo, ServerApiClientOptions } from "@/domains/server/serverType";

const isAbortError = (e: Error) => {
    return e.name === "AbortError";
};

class RefreshAuthTokenInfoTimeoutError extends Error {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options);
    }
}

class ServerApiClient {
    private serverApiUrl: string;
    constructor() {
        this.serverApiUrl = config.apiServerURL;

        if (!this.serverApiUrl) {
            throw new Error("Failed server api client class.");
        }
    }
    
    public async call<B extends (object | undefined), R>(method: HttpMethod, path: string, body?: B, header?: HeadersInit, opts?: ServerApiClientOptions): Promise<ApiResponse<R>> {
        const url = this.getApiUrl(path);

        try {
            const response = await request(url, method, body, header, opts);
            return await this.makeResponseBodyData<R>(response);
        } catch (e) {
            const errorMessage = `failed server api call. url[${url}] method[${method}]`;

            if (e instanceof Error) {
                consoleLogger.error(errorMessage, `error[${e.message}]`);

                if (isAbortError(e)) {
                    throw e;
                }
            } else {
                consoleLogger.error(errorMessage, e);
            }

            return {
                ok: false,
                errorCode: "FAILED_SERVER_API_CALL",
                isRefresh: false,
            };
        }
    }

    public getApiUrl(path: string) {
        if (!path) {
            throw new Error(`invalid parameter path[${path}]`);
        }

        return `${this.serverApiUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
    }

    private async makeResponseBodyData<R>(response: Response): Promise<ApiResponse<R>> {
        const data: unknown = await response.json();

        if (this.isServerResponseBody<R>(data)) {
            const ok = data.ok;

            if (ok) {
                return {
                    ok: true,
                    data: data.data as R
                };
            }

            const errorCode = data.errorCode;
    
            return {
                ok: false,
                errorCode,
                isRefresh: response.status === 401 && errorCode === "UNAUTHORIZED"
            };

        }

        throw new Error("invalid server api response data.");
    }

    private isServerResponseBody<R>(data: unknown): data is ApiResponse<R> {
        return !isNullOrUndefined(data) &&
            typeof data === "object" &&
            !Array.isArray(data) &&
            "ok" in data &&
            typeof data.ok === "boolean" &&
            "data" in data &&
            "errorCode" in data &&
            (typeof data.errorCode === "string" || data.errorCode === null)
    }
}

class ServerUserApiClient {
    private refreshTokenPromise: Promise<ApiResponse<AuthTokenInfo>> | null = null;
    private isRefreshTokenApiError: boolean = false;
    private refreshTokenApiErrorCode: string = "";
    private authUserInfo: ServerApiClientAuthUserInfo;

    constructor(authTokenInfo: ServerApiClientAuthUserInfo) {
        this.authUserInfo = authTokenInfo;
    }

    public async logout(e: unknown) {
        let errorMessage = "none";

        if (e instanceof Error) {
            errorMessage = e.message;
        }

        const body: LogoutRequestBody = {
            id: this.authUserInfo.id,
            deviceId: this.authUserInfo.deviceId,
            deviceType: this.authUserInfo.deviceType,
            errorMessage,
        };

        await serverApiClient.call<LogoutRequestBody, {}>(
            METHODS.DELETE,
            "/logout",
            body,
            this.getAuthHeader(),
        );
    }

    public hasRefreshTokenApiError() {
        return this.isRefreshTokenApiError;
    }

    public async call<B extends object | undefined, R>(method: HttpMethod, path: string, body?: B, header?: HeadersInit, opts?: ServerApiClientOptions, isRetried: boolean = false): Promise<R | ErrorCodeData> {
        try {
            if (this.refreshTokenPromise) {
                await this.refreshTokenPromise;
            }

            if (this.hasRefreshTokenApiError()) {
                return {
                    errorCode: this.refreshTokenApiErrorCode
                };
            }

            const response = await serverApiClient.call<B, R>(
                method,
                path,
                body,
                this.getAuthHeader(header),
                opts,
            );
    
            if (!response.ok) {
                if (response.isRefresh) {
                    if (this.refreshTokenPromise === null) {
                        await this.refreshAuthTokenInfo();

                        if (this.hasRefreshTokenApiError()) {
                            return {
                                errorCode: this.refreshTokenApiErrorCode
                            };
                        }
                    }
    
                    if (!isRetried) {
                        return this.call<B, R>(method, path, body, header, opts, true);
                    }
                }
    
                return {
                    errorCode: response.errorCode
                };
            }
    
            return response.data;
        } catch (e) {
            if (e instanceof RefreshAuthTokenInfoTimeoutError) {
                throw e;
            }

            if (e instanceof Error && isAbortError(e)) {
                return {
                    errorCode: API_TIMEOUT_ERROR_CODE,
                };
            }

            return {
                errorCode: "FAILED_SERVER_API_CALL",
            };
        }
        
    }

    private async refreshAuthTokenInfo(): Promise<void> {
        if (this.refreshTokenPromise !== null) {
            return;
        }

        if (this.authUserInfo === null) {
            throw new Error("not found auth token info.");
        }

        const body: RefreshAuthTokenRequestBody = {
            id: this.authUserInfo.id,
            deviceId: this.authUserInfo.deviceId,
            deviceType: this.authUserInfo.deviceType,
            refreshToken: this.authUserInfo.authTokenInfo.refreshToken
        };


        let isRefreshTokenApiError = true;
        const { timeoutId, signal } = getAbortController(7_000);
        const refreshPromise = (async (): Promise<ApiResponse<AuthTokenInfo>> => {
            try {
                const response = await serverApiClient.call<RefreshAuthTokenRequestBody, AuthTokenInfo>(
                    METHODS.POST,
                    "/refresh",
                    body,
                    this.getAuthHeader(),
                    { signal },
                );

                if (response.ok) {
                    isRefreshTokenApiError = false;
                    this.authUserInfo = {
                        ...this.authUserInfo,
                        authTokenInfo: response.data,
                    };
                } else {
                    this.refreshTokenApiErrorCode = response.errorCode;
                    consoleLogger.error(
                        `failed accessToken refresh. errorCode[${response.errorCode}]`,
                    );
                }

                return response;
            } catch (e) {
                if (e instanceof Error && isAbortError(e)) {
                    this.refreshTokenApiErrorCode = REFRESH_TOKEN_API_TIMEOUT_ERROR_CODE;
                    throw new RefreshAuthTokenInfoTimeoutError(
                        REFRESH_TOKEN_API_TIMEOUT_ERROR_CODE,
                        { cause: e },
                    );
                }

                consoleLogger.error("failed accessToken refresh.", e);
                this.refreshTokenApiErrorCode = "FAILED_REFRESH_TOKEN_API";

                return {
                    ok: false,
                    errorCode: "FAILED_REFRESH_TOKEN_API",
                    isRefresh: false,
                };
            } finally {
                this.isRefreshTokenApiError = isRefreshTokenApiError;
                clearTimeout(timeoutId);
            }
        })();

        this.refreshTokenPromise = refreshPromise;

        try {
            await refreshPromise;
        } finally {
            if (this.refreshTokenPromise === refreshPromise) {
                this.refreshTokenPromise = null;
            }
        }
    }

    private getAuthHeader(header?: HeadersInit) {
        const authHeader = new Headers(header);

        authHeader.set(
            "Authorization",
            `Bearer ${this.authUserInfo.authTokenInfo.accessToken}`,
        );

        return authHeader;
    }
}

const serverApiClient = (() => {
    const apiClient = new ServerApiClient();
    let serverUserApiClient: ServerUserApiClient | null = null;
    let logoutEventCallback: (() => void) | null = null;

    const login: LoginApiType = async (params, callback, opts) => {
        if (serverUserApiClient) {
            throw new Error("already login.");    
        }

        let path = "/auth";

        if (params.type === "auto-login") {
            path = "/auth/auto-login";
        }

        const response = await apiClient.call<LoginRequestBody | AutoLoginRequestBody, LoginResponseBody>(
            METHODS.POST,
            path,
            params.body,
            undefined,
            opts,
        );

        if (response.ok) {
            serverUserApiClient = new ServerUserApiClient(
                {
                    ...params.body,
                    authTokenInfo: response.data.authTokenInfo,
                    id: response.data.userInfo.id,
                },
            )
            logoutEventCallback = callback;
        }

        return response;
    };

    const logout = async (e: unknown) => {
        if (serverUserApiClient) {
            await serverUserApiClient.logout(e);
            serverUserApiClient = null;

            if (logoutEventCallback !== null) {
                logoutEventCallback();
            }
        }
    };

    const authCall = async <B extends object | undefined, R> (method: HttpMethod, path: string, body?: B, header?: HeadersInit, opts?: ServerApiClientOptions): Promise<R | ErrorCodeData> => {
        if (serverUserApiClient) {
            try {
                return await serverUserApiClient.call<B, R>(
                    method,
                    path,
                    body,
                    header,
                    opts,
                );
            } catch (e) {
                if (e instanceof RefreshAuthTokenInfoTimeoutError) {
                    return {
                        errorCode: REFRESH_TOKEN_API_TIMEOUT_ERROR_CODE,
                    };
                }
                
                await logout(e);
                return {
                    errorCode: "FAILD_AUTH_API",
                };
            }
        }

        throw new Error("not login.");  
    };

    return {
        login,
        logout,
        call: <B extends object | undefined, R>(method: HttpMethod, path: string, body?: B, header?: HeadersInit, opts?: ServerApiClientOptions) => apiClient.call<B, R>(method, path, body, header, opts),
        getApiUrl: (path: string) => apiClient.getApiUrl(path),
        authCall,
    };
})();
export default serverApiClient;