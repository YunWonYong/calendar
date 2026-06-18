import { Link as L, useLocation } from "react-router-dom";

import { ReactNode } from "react";
import { trackClick } from "@/analytics/button";

type LinkProps = {
    to: {
        pathname: string;
        search?: string;
        hash?: string;
    } | string;
    className?: string;
    children: ReactNode;
};

const Link = ({ to, className, children }: LinkProps) => {
    const location = useLocation();
    if (typeof to === "string") {
        to = { pathname: to };
    }
    return (
        <L 
            to={ to }
            className={ className }
            onClick={(() => {
                trackClick(
                    `PAGE_MOVE${location.pathname}=>${to.pathname}`,
                )
            })}
        >
            {
                children
            }
        </L>
    );
};

export default Link;