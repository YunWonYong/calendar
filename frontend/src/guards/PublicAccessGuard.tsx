import { Navigate, Outlet } from "react-router-dom";

import useAuth from "@/hooks/auth/useAuth";

const PublicAccessGuard = () => {
    const { isLogin, isLoading } = useAuth();
    if (!isLoading && isLogin) {
        return <Navigate to="/lobby" replace />;
    }

    return <Outlet />;
};

export default PublicAccessGuard;