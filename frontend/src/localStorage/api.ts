import { ACCESS_TOKEN_KEY_LOCAL_STORAGE, DEIVCE_ID_KEY_LOCAL_STORAGE, REFRESH_TOKEN_KEY_LOCAL_STORAGE, THEME_KEY_LOCAL_STORAGE } from "./constants";

import type { ThemeType } from "@/domains/theme/themeTypes";
import type { LocalStorageKeyType } from "./types";

export const saveThemeFromLocalStorage = (theme: ThemeType) => {
    save<ThemeType>(THEME_KEY_LOCAL_STORAGE, theme);
};

export const getThemeFromLocalStorage = () => {
    const value = get<ThemeType>(THEME_KEY_LOCAL_STORAGE);
    if (value === "light" || value === "dark") {
        return value;
    }
    return null;
};

export const setDeviceIdFromLocalStorage = (deviceId: string) => {
    save<string>(DEIVCE_ID_KEY_LOCAL_STORAGE, deviceId);
};

export const getDeviceIdFromLocalStorage = () => {
    return get<string>(DEIVCE_ID_KEY_LOCAL_STORAGE);
};

export const setAccessTokenFromLocalStorage = (accessToken: string) => {
    save<string>(ACCESS_TOKEN_KEY_LOCAL_STORAGE, accessToken);
};

export const setRefreshTokenFromLocalStorage = (refreshToken: string) => {
    save<string>(REFRESH_TOKEN_KEY_LOCAL_STORAGE, refreshToken);
};

export const saveAuthInfoFromLocalStorage = (accessToken: string, refreshToken: string) => {
    save<string>(ACCESS_TOKEN_KEY_LOCAL_STORAGE, accessToken);
    save<string>(REFRESH_TOKEN_KEY_LOCAL_STORAGE, refreshToken);
};

export const getAccessTokenFromLocalStorage = () => {
    return get<string>(ACCESS_TOKEN_KEY_LOCAL_STORAGE);
};

export const getRefreshTokenFromLocalStorage = () => {
    return get<string>(REFRESH_TOKEN_KEY_LOCAL_STORAGE);
};

export const removeAuthInfoFromLocalStorage = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY_LOCAL_STORAGE);
    localStorage.removeItem(REFRESH_TOKEN_KEY_LOCAL_STORAGE);
};

const save = <T extends string, >(key: LocalStorageKeyType, value: T) => {
    localStorage.setItem(key, value);
};

const get = <T, >(key: LocalStorageKeyType): T | null => {
    const value = localStorage.getItem(key);
    if (value === null) {
        return null;
    }

    return value as T;
};