import { Navigate } from "react-router-dom";

import useAuth from "@/hooks/auth/useAuth";

const RootLayout = () => {
    const { isLoading, isLogin } = useAuth();
    if (isLoading) {
        return null;
    }

    return <Navigate to={ isLogin? "/lobby": "/landing" } replace />
};

export default RootLayout;