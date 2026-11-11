import type { ReactNode} from "react";
import { useCallback, useMemo } from "react";

import useGlobalOverlay from "../overlay/useGlobalOverlay";

const useGlobalLoading = () => {
    const { openGlobalOverlay, updateGlobalOverlay, closeGlobalOverlay, isOpenGlobalOverlay } = useGlobalOverlay();
    const createLoading = useCallback((Content: ReactNode) => {
        let fn = openGlobalOverlay;

        if (isOpenGlobalOverlay) {
            fn = updateGlobalOverlay;
        }

        fn(
            () => Content,
        );
    }, [openGlobalOverlay, updateGlobalOverlay, isOpenGlobalOverlay]);

    const destroyLoading = useCallback(() => {
        closeGlobalOverlay();
    }, [closeGlobalOverlay]);

    const value = useMemo(() => {
        return {
            createLoading, 
            destroyLoading
        };
    }, [createLoading, destroyLoading]);

    return value;
};

export default useGlobalLoading;