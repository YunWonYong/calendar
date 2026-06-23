import { Outlet } from "react-router-dom";

import AuthProvider from "@/contexts/auth/AuthProvider";

const MainLayout = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
};

export default MainLayout;