import { useContext } from "react";

import GlobalOverlayContext from "@/contexts/global/overlay/GlobalOverlayContext";

import type { GlobalOverlayContextType } from "@/domains/global/overlay/overlayType";

const useGlobalOverlay = () => {
    const ctx = useContext<GlobalOverlayContextType>(GlobalOverlayContext);
    return ctx;
};

export default useGlobalOverlay;