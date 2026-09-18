import type { AuthTokenInfo } from "../auth/authTypes";
import type { DeviceType } from "../device/deviceTypes";
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
    (params: AuthenticateApiParameterType, logoutCallback: () => void) => 
        Promise<LoginResponseBody>;

export type LogoutRequestBody = {
    id: number;
    deviceId: string;
    deviceType: DeviceType;
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