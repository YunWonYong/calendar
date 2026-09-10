import { Navigate, Outlet } from "react-router-dom";

import useAuth from "@/hooks/auth/useAuth";

const RequiredAuthGuard = () => {
    const { isLogin, isLoading } = useAuth();

    if (!isLoading && !isLogin) {
        return <Navigate to="/landing" replace />;
    }

    return <Outlet />;
};


export default RequiredAuthGuard;