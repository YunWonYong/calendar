import { createBrowserRouter, RouteObject } from "react-router-dom";

import RootLayout from "@/layout/RootLayout";
import NotFoundPage from "@/not-found/NotFoundPage";

import LobbyRouters from "./LobbyRoute";
import LoginRoutes from "./LoginRoute";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <RootLayout />
    },
    ...LobbyRouters,
    ...LoginRoutes,
    {
        path: "*",
        element: <NotFoundPage />,
    },
];

const router = createBrowserRouter(routes);

export default router;