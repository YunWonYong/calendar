import { FC, ReactNode, useEffect, useRef, useState } from "react";

import useDevice from "@/hooks/device/UseDevice";
import { getRefreshTokenFromLocalStorage, removeAuthInfoFromLocalStorage, saveAuthInfoFromLocalStorage } from "@/localStorage/api";
import { authenticate } from "@/server/api";

import AuthContext from "./AuthContext";

import type { AuthenticateApiParameterType, LoginResponseBody } from "@/domains/server/serverType";
import type { UserInfo } from "@/domains/user/userType";
import type { DeviceInfo } from "@/domains/device/deviceTypes";

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

const getLoginBodyData = (deviceInfo: DeviceInfo, authCode: string, refreshToken: string | null): AuthenticateApiParameterType => {
    if (refreshToken === null || refreshToken.length === 0) {
        return {
            type: "login",
            body: {
                authCode,
                deviceId: deviceInfo.deviceId,
                deviceType: deviceInfo.deviceType,
            }
        };
    }

    return {
        type: "auto-login",
        body: {
            refreshToken,
            deviceId: deviceInfo.deviceId,
            deviceType: deviceInfo.deviceType,
        }
    };
};

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [ userInfo, setUserInfo ] = useState<UserInfo | null>(null);
    const [ fetchState, setFetchState ] = useState<boolean>(true);
    const deviceInfo = useDevice();
    const lockRef = useRef<boolean>(false);
    useEffect(() => {
        if (userInfo) {
            return;
        }

        if (lockRef.current) {
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
        const logoutCallback = () => {
            // global modal을 띄워 사용자가 클릭 후 로그아웃되게 해야 하나?
            setUserInfo(null);
            removeAuthInfoFromLocalStorage();
        };

        (async () => {
            if ((!authCode || authCode.length === 0) && (!refreshToken || refreshToken.length === 0)) {
                setFetchState(false);
                return;
            }
            lockRef.current = true;
            setFetchState(true);
            try {
                const result = await authenticate({
                    data: getLoginBodyData(deviceInfo, authCode, refreshToken),
                    logoutCallback,
                });

                setAuthenticateApiResult(result);
            } catch(e) {
                // [TODO] error logging
                removeAuthInfoFromLocalStorage();
                setUserInfo(null);
                console.error(e);
            } finally {
                lockRef.current = false;
                setFetchState(false);
            }
        })();
    }, [userInfo, deviceInfo]);
    return (
        <AuthContext.Provider value={{ isLogin: userInfo !== null, userInfo, isLoading: fetchState }}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;