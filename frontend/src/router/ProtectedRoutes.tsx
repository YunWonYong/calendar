import { RouteObject } from "react-router-dom";

import RequiredAuthGuard from "@/guards/RequiredAuthGuard";
import LobbyPage from "@/pages/lobby/LobbyPage";
import CreateGroupPage from "@/pages/group/create/GroupCreatePage";

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