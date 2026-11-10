import { createContext } from "react";

import NotInitializedError from "@/lib/context/NotInitializedError";

import type { GlobalOverlayContextType } from "@/domains/global/overlay/overlayType";

const errorFn = () => { throw new NotInitializedError("GlobalOverlayContext"); };

const GlobalOverlayContext = createContext<GlobalOverlayContextType>({
    isOpenGlobalOverlay: false,
    openGlobalOverlay: errorFn,
    updateGlobalOverlay: errorFn,
    closeGlobalOverlay: errorFn,
});

export default GlobalOverlayContext;