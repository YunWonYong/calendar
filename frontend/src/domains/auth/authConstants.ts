import type { AuthProvider } from "./authTypes";

export const AUTH_PROVIDERS: AuthProvider[] = [
    "google",
    "naver",
    "kakao"
] as const;