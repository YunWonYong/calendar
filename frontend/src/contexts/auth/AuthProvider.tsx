import { FC, ReactNode, useEffect, useRef, useState } from "react";

import AuthContext from "./AuthContext";
import useDevice from "@/hooks/device/UseDevice";

import { autoLogin, login } from "@/server/loginApi";
import { getRefreshTokenFromLocalStorage, removeAuthInfoFromLocalStorage, saveAuthInfoFromLocalStorage } from "@/localStorage/api";

import type { LoginResponseBody } from "@/domains/server/serverType";
import type { UserInfo } from "@/domains/user/userType";

const parameterNames = {
    AUTH_CODE: "code",    
};

const getAuthCode = () => {
    const url = new URL(window.location.href);
    const authCode = url.searchParams.get(parameterNames.AUTH_CODE);
    if (!authCode || authCode.length === 0) {
        return "";
    }

    url.searchParams.delete("code");
    window.history.replaceState({}, "", url);
    return authCode;
};

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [ userInfo, setUserInfo ] = useState<UserInfo | null>(null);
    const [ fetchState, setFetchState ] = useState<boolean>(false);
    const { deviceId, deviceType } = useDevice();
    const lockRef = useRef<boolean>(false);
    useEffect(() => {
        if (userInfo) {
            return;
        }

        if (lockRef.current || fetchState) {
            return;
        }

        const setAuthenticateApiResult = ({ authTokenInfo, userInfo }: LoginResponseBody) => {
            saveAuthInfoFromLocalStorage(
                authTokenInfo.accessToken,
                authTokenInfo.refreshToken
            );
            setUserInfo(userInfo);
        };

        const authCode = getAuthCode();
        const refreshToken = getRefreshTokenFromLocalStorage();
        const authenticate = async () => {
            if ((!authCode || authCode.length === 0) && (!refreshToken || refreshToken.length === 0)) {
                return;
            }
            lockRef.current = true;
            setFetchState(true);
            try {
                const response = refreshToken && refreshToken.length > 0
                    ? await autoLogin({ refreshToken, deviceId, deviceType })
                    : await login({ authCode, deviceId, deviceType });
                
                if (!response.ok) {
                    throw new Error(response.errorMessage);
                }
                const { data } = response;
                setAuthenticateApiResult(data);
                
            } catch(e) {
                // [TODO] error logging
                removeAuthInfoFromLocalStorage();
                console.error(e);
            } finally {
                lockRef.current = false;
                setFetchState(false);
            }
        };
        authenticate();
    }, [userInfo, deviceId, deviceType]);
    return (
        <AuthContext.Provider value={{ isLogin: userInfo !== null, userInfo, isLoading: fetchState }}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;