import type { UserInfo } from "../user/userType";

export type AuthProvider = "google" | "kakao" | "naver";

export type AuthContextType = {
    userInfo: UserInfo;
};

export type AuthTokenInfo = {
    accessToken: string;
    refreshToken: string;
};