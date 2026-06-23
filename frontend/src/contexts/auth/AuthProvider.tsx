import { FC, ReactNode, useEffect, useRef, useState } from "react";

import AuthContext from "./AuthContext";

import type { UserData } from "@/domains/user/userType";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [ userData, setUserData ] = useState<UserData>({});
    const [ fetchState, setFetchState ] = useState<boolean>(false);
    const lockRef = useRef<boolean>(false);

    useEffect(() => {
        if (fetchState) {
            return;
        }
        const auth = async () => {
            if (lockRef.current) {
                return;
            }
            try {
                setFetchState(true);
                lockRef.current = true

                const param = new URLSearchParams(window.location.search);
                const authCode = param.get("authCode");
                if (authCode === null) {
                    return;
                }

            } catch(e) {
                // [TODO] error logging
            } finally {
                setFetchState(false);
                lockRef.current = false;
            }
        };
        auth();
    }, [userData, fetchState, lockRef]);
    return (
        <AuthContext.Provider value={{ userData }}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;