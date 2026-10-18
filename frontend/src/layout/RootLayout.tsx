import { Outlet } from "react-router-dom";

import PlanProvider from "@/contexts/plan/PlanProvider";

const RootLayout = () => {
    return (
        <PlanProvider>
            <Outlet />
        </PlanProvider>
    );
};

export default RootLayout;