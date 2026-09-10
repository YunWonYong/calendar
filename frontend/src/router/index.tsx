import { createBrowserRouter, RouteObject } from "react-router-dom";

import RootLayout from "@/layout/RootLayout";
import NotFoundPage from "@/not-found/NotFoundPage";

import LobbyRouters from "./LobbyRoute";
import LoginRoutes from "./LoginRoute";
import LandingRoutes from "./LandingRoute";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <RootLayout />
    },
    ...LobbyRouters,
    ...LoginRoutes,
    ...LandingRoutes,
    {
        path: "*",
        element: <NotFoundPage />,
    },
];

const router = createBrowserRouter(routes);

export default router;