import type { ComponentType, FC, ReactNode } from "react";
import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import Overlay from "@/components/overlay/Overlay";

import GlobalOverlayContext from "./GlobalOverlayContext";

import type { OpenGlobalOverlayOptions } from "@/domains/global/overlay/overlayType";

const GlobalOverlayProvider: FC<{ children: ReactNode; }> = ({ children }) => {
    const globalOverlayRoot = document.getElementById("globalOverlayRoot");

    if (globalOverlayRoot === null) {
        throw new Error("globalOverlayRoot element not found.");
    }

    const [overlay, setOverlay] = useState<{ Component: ComponentType; onClick: () => void; } | null>(null);

    const closeGlobalOverlay = useCallback(() => {
        setOverlay(null);
    }, []);

    const openGlobalOverlay = useCallback((Component: ComponentType, opt?: OpenGlobalOverlayOptions) => {
        setOverlay(overlay => {
            if (overlay) {
                return overlay;
            }

            const onClick = () => {
                if (opt) {
                    if (opt.onClick) {
                        opt.onClick();
                    }

                    if (opt.isOverlayClickClose) {
                        closeGlobalOverlay();
                    }
                }
            };

            return {
                Component,
                onClick,
            };
        });
    }, [closeGlobalOverlay]);

    const updateGlobalOverlay = useCallback((Component: ComponentType, opt?: OpenGlobalOverlayOptions) => {
        setOverlay(overlay => {
            if (!overlay) {
                return overlay;
            }

            const onClick = () => {
                if (opt) {
                    if (opt.onClick) {
                        opt.onClick();
                    }

                    if (opt.isOverlayClickClose) {
                        closeGlobalOverlay();
                    }
                }
            };

            return {
                Component,
                onClick,
            };
        });
    }, [closeGlobalOverlay]);
    const value = useMemo(() => {
        return {
            isOpenGlobalOverlay: overlay !== null,
            openGlobalOverlay,
            closeGlobalOverlay,
            updateGlobalOverlay
        };
    }, [closeGlobalOverlay, openGlobalOverlay, updateGlobalOverlay, overlay]);

    return (
        <GlobalOverlayContext.Provider
            value={ value }
        >
            {
                children
            }
            {
                overlay &&
                    createPortal(
                        (
                            <Overlay
                                onClick={ overlay.onClick }
                            >
                                {
                                    <overlay.Component />
                                }
                            </Overlay>
                        ),
                        globalOverlayRoot
                    )
            }
        </GlobalOverlayContext.Provider>
    );
};

export default GlobalOverlayProvider;