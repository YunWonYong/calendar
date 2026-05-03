import { createBrowserRouter, RouteObject } from "react-router-dom";

import NotFoundPage from "@/not-found";
import { MainRouters } from "./MainRoute";
import { LoginRoutes } from "./LoginRoute";

const routes: RouteObject[] = [
    MainRouters,
    LoginRoutes,
    {
        path: "*",
        element: <NotFoundPage />,
    },
];

const router = createBrowserRouter(routes);

export default router;