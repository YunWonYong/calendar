import { Outlet } from "react-router-dom";

import GlobalOverlayProvider from "@/contexts/global/overlay/GlobalOverlayProvider";
import LocaleProvider from "@/contexts/locale/LocaleProvider";
import PlanProvider from "@/contexts/plan/PlanProvider";

const RootLayout = () => {
    return (
        <GlobalOverlayProvider>
            <LocaleProvider>
                <PlanProvider>
                    <Outlet />
                </PlanProvider>
            </LocaleProvider>
        </GlobalOverlayProvider>
    );
};

export default RootLayout;