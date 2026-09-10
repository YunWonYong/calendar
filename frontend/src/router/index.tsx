import { createBrowserRouter, RouteObject } from "react-router-dom";

import NotFoundPage from "@/not-found";
import LobbyRouters from "./LobbyRoute";
import LoginRoutes from "./LoginRoute";

const routes: RouteObject[] = [
    ...LobbyRouters,
    ...LoginRoutes,
    {
        path: "*",
        element: <NotFoundPage />,
    },
];

const router = createBrowserRouter(routes);

export default router;