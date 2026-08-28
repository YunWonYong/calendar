import { createContext } from "react";
import type { AuthContextType } from "@/domains/auth/authTypes";


const AuthContext = createContext<AuthContextType>({
    isLoading: false,
    isLogin: false,
    userInfo: null
});

export default AuthContext;