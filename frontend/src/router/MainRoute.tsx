import { RouteObject } from "react-router-dom";

import MainLayout from "@/layout/MainLayout";
import LobbyPage from "@/pages/lobby/LobbyPage";

export const MainRouters: RouteObject = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            index: true,
            element: <LobbyPage />,
        },
    ],
    
};