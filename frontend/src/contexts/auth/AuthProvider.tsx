import { FC, ReactNode, useEffect, useRef, useState } from "react";

import AuthContext from "./AuthContext";
import useDevice from "@/hooks/device/UseDevice";

import type { UserData } from "@/domains/user/userType";
import { login } from "@/server/loginApi";

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
    const [ userData, setUserData ] = useState<UserData>({});
    const [ fetchState, setFetchState ] = useState<boolean>(false);
    const { deviceId, deviceType } = useDevice();
    const lockRef = useRef<boolean>(false);
    useEffect(() => {
        const authenticate = async () => {
            if (lockRef.current) {
                return;
            }

            try {
                const authCode = getAuthCode();
                setFetchState(true);
                lockRef.current = true;
                if (authCode.length === 0) {
                    return;
                }
                const response = await login({
                    authCode,
                    deviceId,
                    deviceType,
                });
                if (!response.ok) {
                    throw new Error(response.errorMessage);
                }

                setUserData(response.data);
            } catch(e) {
                // [TODO] error logging
            } finally {
                setFetchState(false);
                lockRef.current = false;
            }
        };
        authenticate();
    }, [fetchState]);
    return (
        <AuthContext.Provider value={{ userData }}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;