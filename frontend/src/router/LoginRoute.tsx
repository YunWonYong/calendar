import { RouteObject } from "react-router-dom";

import LoginPage from "@/pages/login/LoginPage";

const LoginRoutes: RouteObject[] = [
    {
        path: "/login",
        element: <LoginPage />,
    }
];

export default LoginRoutes;