import { useEffect, useState } from "react";

export const VIEWPORT_BREAKPOINTS = {
    VERTICAL_UI_BRAEKPOINT: 900,
} as const;

const getCurrentViewportSize = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
};

const isVerticalUI = () => {
    const mediaQuery = window.matchMedia(`(max-width: ${VIEWPORT_BREAKPOINTS.VERTICAL_UI_BRAEKPOINT}px)`);
    return mediaQuery.matches;
};

const useViewport = () => {
    const [state, setState] = useState(() => {
        return {
            isVerticalUI: isVerticalUI(),
            ...getCurrentViewportSize()
        };
    });

    useEffect(() => {
        const resizingHandler = () => {
            console.log("resize");
            setState({
                isVerticalUI: isVerticalUI(),
                ...getCurrentViewportSize()
            });
        };
        window.addEventListener("resize", resizingHandler);
        return () => {
            window.removeEventListener("resize", resizingHandler);
        };
    }, []);
    return state;
};

export default useViewport;