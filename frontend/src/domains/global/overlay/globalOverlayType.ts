import type { ComponentType } from "react";

export type OpenGlobalOverlayOptions = {
    onClick?: () => void;
    isOverlayClickClose?: boolean;
};

export type GlobalOverlayContextType = {
    isOpenGlobalOverlay: boolean;
    openGlobalOverlay: (Component: ComponentType, opt?: OpenGlobalOverlayOptions) => void;
    updateGlobalOverlay: (Component: ComponentType, opt?: OpenGlobalOverlayOptions) => void;
    closeGlobalOverlay: () => void;
};