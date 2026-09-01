import { createContext } from "react";
import type { AuthContextType } from "@/domains/auth/authTypes";


const AuthContext = createContext<AuthContextType>({
    isLoading: false,
    isLogin: false,
    userInfo: null,
    dummyLogin: () => { throw new Error("not initialized") }
});

export default AuthContext;