import type { UserData } from "../user/userType";

export type AuthProvider = "google" | "kakao" | "naver";

export type AuthContextType = {
    userData: UserData;
};