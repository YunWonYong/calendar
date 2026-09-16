import { createBrowserRouter, RouteObject } from "react-router-dom";

import RootLayout from "@/layout/RootLayout";
import NotFoundPage from "@/not-found/NotFoundPage";

import LandingRoutes from "./LandingRoute";
import LoginRoutes from "./LoginRoute";
import ProtectedRoutes from "./ProtectedRoutes";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <RootLayout />
    },
    ...ProtectedRoutes,
    ...LoginRoutes,
    ...LandingRoutes,
    {
        path: "*",
        element: <NotFoundPage />,
    },
];

const router = createBrowserRouter(routes);

export default router;