import { DeviceType } from "../device/deviceTypes";

export type LoginRequestBody = {
    authCode: string;
    deviceId: string;
    deviceType: DeviceType;
};