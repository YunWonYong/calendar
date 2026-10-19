import type { ReactNode } from "react";
import { Link as L, useLocation } from "react-router-dom";

import { trackClick } from "@/analytics/button";

type LinkProps = {
    to: {
        pathname: string;
        search?: string;
        hash?: string;
    } | string;
    className?: string;
    clickEventName?: string;
    children: ReactNode;
};

export const getPageMoveEventName = (from: string, to: string) => `PAGE_MOVE@${from}=>${to}`;

export const movePageEventTranckClick = (from: string, to: string, fn?: (() => void | Promise<void>)) => {
    trackClick(getPageMoveEventName(from, to), fn);
};

const Link = ({ to, className, children, clickEventName }: LinkProps) => {
    const location = useLocation();

    if (typeof to === "string") {
        to = { pathname: to };
    }

    return (
        <L 
            to={ to }
            className={ className }
            onClick={(() => {
                movePageEventTranckClick(
                    location.pathname,
                    to.pathname,
                );

                if (clickEventName && clickEventName.length > 0) {
                    trackClick(clickEventName);
                }
            })}
        >
            {
                children
            }
        </L>
    );
};

export default Link;