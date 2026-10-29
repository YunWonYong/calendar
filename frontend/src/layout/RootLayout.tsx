import { Outlet } from "react-router-dom";

import LocaleProvider from "@/contexts/locale/LocaleProvider";
import PlanProvider from "@/contexts/plan/PlanProvider";

const RootLayout = () => {
    return (
        <LocaleProvider>
            <PlanProvider>
                <Outlet />
            </PlanProvider>
        </LocaleProvider>
    );
};

export default RootLayout;