import type { UserInfo } from "../user/userType";

export type AuthProvider = "google" | "kakao" | "naver";

export type AuthContextType = {
    isLogin: boolean;
    userInfo: UserInfo | null;
    isLoading: boolean;
};

export type AuthTokenInfo = {
    accessToken: string;
    refreshToken: string;
};