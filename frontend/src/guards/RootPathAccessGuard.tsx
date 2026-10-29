import { Navigate } from "react-router-dom";

import useAuth from "@/hooks/auth/useAuth";

const RootPathAccessGuard = () => {
    const { isLogin, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    return <Navigate to={ isLogin? "/lobby": "/landing" } replace />
};

export default RootPathAccessGuard;