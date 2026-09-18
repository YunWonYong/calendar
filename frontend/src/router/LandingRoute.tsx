import { RouteObject } from "react-router-dom";

import PublicAccessGuard from "@/guards/PublicAccessGuard";
import LandingPage from "@/pages/landing/LandingPage";

const LandingRoutes: RouteObject[] = [
    {
        path: "/landing",
        element: <PublicAccessGuard />,
        children: [
            {
                index: true,
                element: <LandingPage />,
            },
        ],
    },
];

export default LandingRoutes;