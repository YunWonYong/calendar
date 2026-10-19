import type { MouseEvent } from "react";
import type { NavigateOptions } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import { trackClickAndPreventDefault } from "@/analytics/button";
import { getPageMoveEventName, movePageEventTranckClick } from "@/components/Link";

const usePageMove = () => {
    const location = useLocation();
    const nav = useNavigate();

    const movePageTo = (to: string, options?: NavigateOptions) => {
        movePage(location.pathname, to, options);
    };

    const movePage = (from: string, to: string, options?: NavigateOptions) => {
        movePageEventTranckClick(
            from,
            to,
            () => nav(to, options),
        );
    };

    const movePageToClick = <T extends HTMLElement> (event: MouseEvent<T>, to: string, options?: NavigateOptions) => {
        movePageClick(event, location.pathname, to, options);
    };

    const movePageClick = <T extends HTMLElement> (event: MouseEvent<T>, from: string, to: string, options?: NavigateOptions) => {
        trackClickAndPreventDefault(
            event,
            getPageMoveEventName(from, to),
            () => nav(to, options),
        )
    };

    return {
        movePage,
        movePageTo,
        movePageClick,
        movePageToClick,
    };
};

export default usePageMove;