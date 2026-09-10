import { RouteObject } from "react-router-dom";

import PublicAccessGuard from "@/guards/PublicAccessGuard";
import LoginPage from "@/pages/login/LoginPage";

const LoginRoutes: RouteObject[] = [
    {
        path: "/login",
        element: <PublicAccessGuard />,
        children: [
            {
                index: true,
                element: <LoginPage />,
            },
        ],
    }
];

export default LoginRoutes;