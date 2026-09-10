import { Outlet } from "react-router-dom";

import AuthProvider from "@/contexts/auth/AuthProvider";

const AuthLayout = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
};

export default AuthLayout;