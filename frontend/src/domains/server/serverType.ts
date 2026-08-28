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