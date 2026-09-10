import { RouteObject } from "react-router-dom";

import RequiredAuthGuard from "@/guards/RequiredAuthGuard";
import LobbyPage from "@/pages/lobby/LobbyPage";

const LobbyRouters: RouteObject[] = [
    {
        path: "/lobby",
        element: <RequiredAuthGuard />,
        children: [
            {
                index: true,
                element: <LobbyPage />,
            },
        ],
        
    }
];


export default LobbyRouters;