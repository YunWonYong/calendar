import { RouteObject } from "react-router-dom";

import RequiredAuthGuard from "@/guards/RequiredAuthGuard";
import CreateGroupPage from "@/pages/group/create/GroupCreatePage";
import LobbyPage from "@/pages/lobby/LobbyPage";

const ProtectedRoutes: RouteObject[] = [
    {
        element: <RequiredAuthGuard />,
        children: [
            {
                path: "/lobby",
                element:  <LobbyPage />
            },
            {
                path: "/group",
                children: [
                    {
                        path: "create",
                        element: <CreateGroupPage />
                    }
                ],
            }
        ],
    },
];

export default ProtectedRoutes;