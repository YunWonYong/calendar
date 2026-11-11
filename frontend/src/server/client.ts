import { consoleLogger } from "@/analytics/logger/console";
import config from "@/config";
import { METHODS } from "@/domains/fetch/fetchConstants";
import { request } from "@/lib/fetch";
import { isNullOrUndefined } from "@/lib/validation/validation";

import type { AuthTokenInfo } from "@/domains/auth/authTypes";
import type { ApiResponse, ErrorCodeData, HttpMethod } from "@/domains/fetch/fetchType";
import type { AutoLoginRequestBody, LoginApiType, LoginRequestBody, LoginResponseBody, LogoutRequestBody, RefreshAuthTokenRequestBody, ServerApiClientAuthUserInfo } from "@/domains/server/serverType";


class ServerApiClient {
    private serverApiUrl: string;
    constructor() {
        this.serverApiUrl = config.apiServerURL;

        if (!this.serverApiUrl) {
            throw new Error("Failed server api client class.");
        }
    }
    
    public async call<B extends (object | undefined), R>(method: HttpMethod, path: string, body?: B, header?: HeadersInit): Promise<ApiResponse<R>> {
        const url = this.getApiUrl(path);

        try {
            const response = await request(url, method, body, header);
            return await this.makeResponseBodyData<R>(response);
        } catch (e) {
            const errorMessage = `failed server api call. url[${url}] method[${method}]`;

            if (e instanceof Error) {
                consoleLogger.error(errorMessage, `error[${e.message}]`);
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
    private authUserInfo: ServerApiClientAuthUserInfo;

    constructor(authTokenInfo: ServerApiClientAuthUserInfo) {
        this.authUserInfo = authTokenInfo;
    }

    public async logout() {
        // [TODO] logout api check.
        if (this.authUserInfo === null) {
            return;
        }

        await serverApiClient.call<LogoutRequestBody, {}>(
            METHODS.DELETE,
            "/logout",
            this.authUserInfo,
            this.getAuthHeader(),
        );
    }

    public hasRefreshTokenApiError() {
        return this.isRefreshTokenApiError;
    }

    public async call<B extends object | undefined, R>(method: HttpMethod, path: string, body?: B, header?: HeadersInit): Promise<R | ErrorCodeData> {
        if (this.refreshTokenPromise) {
            await this.refreshTokenPromise;
        }

        if (this.hasRefreshTokenApiError()) {
            return {
                errorCode: "REFRESH_AUTH_TOKEN_API"
            };
        }

        const response = await serverApiClient.call<B, R>(
            method,
            path,
            body,
            this.getAuthHeader(header),
        );

        if (!response.ok) {
            if (response.isRefresh) {
                if (this.refreshTokenPromise === null) {
                    await this.refreshAuthTokenInfo();
                }

                return this.call<B, R>(method, path, body, header);
            }

            return {
                errorCode: response.errorCode
            };
        }

        return response.data;
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

        this.refreshTokenPromise = serverApiClient.call<RefreshAuthTokenRequestBody, AuthTokenInfo>(
            METHODS.POST,
            "/refresh",
            body,
            this.getAuthHeader(),
        );

        try {
            const response = await this.refreshTokenPromise;

            if (response.ok) {
                this.authUserInfo = {
                    ...this.authUserInfo,
                    authTokenInfo: response.data,
                };
                return;
            }

            consoleLogger.error(`failed accessToken refresh. errorCode[${response.errorCode}]`);
            this.isRefreshTokenApiError = true;
        } finally {
            this.refreshTokenPromise = null;
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

    const login: LoginApiType = async (params, callback) => {
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
            params.body
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

    const logout = async () => {
        if (serverUserApiClient) {
            await serverUserApiClient.logout();
            serverUserApiClient = null;

            if (logoutEventCallback !== null) {
                logoutEventCallback();
            }
        }
    };

    const authCall = async <B extends object | undefined, R> (method: HttpMethod, path: string, body?: B, header?: HeadersInit): Promise<R | ErrorCodeData> => {
        if (serverUserApiClient) {
            try {
                return await serverUserApiClient.call<B, R>(
                    method,
                    path,
                    body,
                    header,
                );
            } catch (_e) {
                await logout();
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
        call: <B extends object | undefined, R>(method: HttpMethod, path: string, body?: B, header?: HeadersInit) => apiClient.call<B, R>(method, path, body, header),
        getApiUrl: (path: string) => apiClient.getApiUrl(path),
        authCall,
    };
})();
export default serverApiClient;