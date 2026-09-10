import { RouteObject } from "react-router-dom";

import AuthLayout from "@/layout/AuthLayout";
import LobbyPage from "@/pages/lobby/LobbyPage";

const LobbyRouters: RouteObject[] = [
    {
        path: "/lobby",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <LobbyPage />,
            },
        ],
        
    }
];


export default LobbyRouters;