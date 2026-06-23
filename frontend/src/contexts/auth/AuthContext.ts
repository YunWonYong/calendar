import { createContext } from "react";
import type { AuthContextType } from "@/domains/auth/authTypes";


const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;