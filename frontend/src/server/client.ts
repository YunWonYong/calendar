import config from "@/config";
import { METHODS } from "@/domains/fetch/fetchConstants";
import { post } from "@/lib/fetch";

import type { AuthTokenInfo } from "@/domains/auth/authTypes";
import type { AutoLoginRequestBody, LoginApiType, LoginRequestBody, LoginResponseBody, LogoutRequestBody, RefreshAuthTokenRequestBody, ServerApiClientAuthTokenRefreshFailResult, ServerApiClientAuthUserInfo } from "@/domains/server/serverType";
import type { ApiResponse, HttpMethod } from "@/domains/fetch/fetchType";
const DEFAULT_HEADER = {
    "Content-Type": "application/json",
};

class ServerApiClient {
    private serverApiUrl: string;
    constructor() {
        this.serverApiUrl = config.apiServerURL;
        if (!this.serverApiUrl) {
            throw new Error("Failed server api client class.");
        }
    }
    
    public async call<B extends object, R>(method: HttpMethod, path: string, body?: B, header?: Record<string, string>) {
        if (!header) {
            header = { ...DEFAULT_HEADER };
        }

        const url = this.getApiUrl(path);
        switch(method) {
            case METHODS.POST:
                return post<R>(url, body, header);
        }
        
        throw new Error(`not supported method[${method}]`);
    }

    public getApiUrl(path: string) {
        if (!path) {
            throw new Error(`invalid parameter path[${path}]`);
        }

        const pathFirstChar = path.charAt(0);
        const serverApiUrlLastChar = this.serverApiUrl.charAt(this.serverApiUrl.length - 1);
        if (pathFirstChar === "/" && serverApiUrlLastChar === "/") {
            return `${this.serverApiUrl}${path.slice(1)}`;
        }

        return `${this.serverApiUrl}${path}`;
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
        if (this.authUserInfo === null) {
            return;
        }
        const response = await serverApiClient.call<LogoutRequestBody, {}>(
            METHODS.DELETE,
            "/logout",
            this.authUserInfo,
            this.getAuthHeader(),
        );

        if (!response.ok) {
            // [TODO] logout api error logging.
            console.error("ServerUserApiClient.logout error. message: ", response.errorMessage);
        }
    }

    public hasRefreshTokenApiError() {
        return this.isRefreshTokenApiError;
    }

    public async call<B extends object, R>(method: HttpMethod, path: string, body?: B, header?: Record<string, string>): Promise<R | ServerApiClientAuthTokenRefreshFailResult> {
        if (this.refreshTokenPromise) {
            await this.refreshTokenPromise;
        }

        if (this.isRefreshTokenApiError) {
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

            throw new Error(response.errorMessage);
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
            if (!response.ok) {
                throw new Error(response.errorMessage);
            }

            this.authUserInfo = {
                ...this.authUserInfo,
                authTokenInfo: response.data,
            };
        } catch(e) {
            this.isRefreshTokenApiError = true;
            throw e;
        } finally {
            this.refreshTokenPromise = null;
        }
    }

    private getAuthHeader(header: Record<string, string> = {}) {
        const authHeader: Record<string, any> = {
            ...DEFAULT_HEADER,
            ...header,
        };

        if (this.authUserInfo) {
            authHeader["USER_ID"] = this.authUserInfo.id;
            authHeader["REFRESH_TOKEN"] = this.authUserInfo.authTokenInfo.refreshToken;
            authHeader["ACCESS_TOKEN"] = this.authUserInfo.authTokenInfo.accessToken;
        }

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

        if (!response.ok) {
            throw new Error(response.errorMessage);
        }

        serverUserApiClient = new ServerUserApiClient(
            {
                ...params.body,
                authTokenInfo: response.data.authTokenInfo,
                id: response.data.userInfo.id,
            },
        )

        logoutEventCallback = callback;
        return response.data;
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

    const authCall = async <B extends object, R> (method: HttpMethod, path: string, body?: B, header?: Record<string, string>) => {
        if (serverUserApiClient) {
            try {
                const response = await serverUserApiClient.call<B, R>(
                    method,
                    path,
                    body,
                    header,
                );

                if (serverUserApiClient.hasRefreshTokenApiError()) {
                    throw new Error("refresh token api error.");
                }
                return response;
            } catch(e) {
                await logout();
                return {
                    errorCode: "AUTH_API_FAILED",
                };
            }
        }

        throw new Error("not login.");  
    };
    return {
        login,
        logout,
        call: <B extends object, R>(method: HttpMethod, path: string, body?: B, header?: Record<string, string>) => apiClient.call<B, R>(method, path, body, header),
        getApiUrl: (path: string) => apiClient.getApiUrl(path),
        authCall,
    };
})();
export default serverApiClient;