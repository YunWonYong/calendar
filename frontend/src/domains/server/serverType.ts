import type { AuthTokenInfo } from "../auth/authTypes";
import type { DeviceType } from "../device/deviceTypes";
import type { ApiResponse } from "../fetch/fetchType";
import type { UserInfo } from "../user/userType";

export type LoginRequestBody = {
    authCode: string;
    deviceId: string;
    deviceType: DeviceType;
};

export type LoginResponseBody = {
    authTokenInfo: AuthTokenInfo;
    userInfo: UserInfo;
};

export type AutoLoginRequestBody = {
    refreshToken: string;
    deviceId: string;
    deviceType: DeviceType;
};

export type AuthenticateApiParameterType =
    {
        type: "login";
        body: LoginRequestBody;
    } | 
    {
        type: "auto-login";
        body: AutoLoginRequestBody;
    };

export type LoginApiType = 
    (params: AuthenticateApiParameterType, logoutCallback: () => void, opts?: ServerApiClientOptions) => 
        Promise<ApiResponse<LoginResponseBody>>;

export type LogoutRequestBody = {
    id: number;
    deviceId: string;
    deviceType: DeviceType;
    errorMessage?: string;
};

export type RefreshAuthTokenRequestBody = {
    id: number;
} & AutoLoginRequestBody;

export type ServerApiClientAuthUserInfo = {
    id: number;
    deviceId: string;
    deviceType: DeviceType;
    authTokenInfo: AuthTokenInfo;
};

export type ServerApiClientAuthTokenRefreshFailResult = {
    errorCode: string;
};

export const API_TIMEOUT_ERROR_CODE = "TIMEOUT_SERVER_API";
export const REFRESH_TOKEN_API_TIMEOUT_ERROR_CODE = "TIMEOUT_REFRESH_ACCESS_TOKEN_API";
export type ServerApiClientOptions = {
    signal: AbortSignal;
};