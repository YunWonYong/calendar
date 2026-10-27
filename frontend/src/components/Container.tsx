import type { FC, HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef } from "react";

import styles from "./Container.module.css";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        if (containerRef.current === null) {
            return;
        }
    }, []);

    const onScroll = (ev: React.UIEvent<HTMLDivElement, UIEvent>) => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        
        timeoutRef.current = setTimeout(() => {
            if (containerRef.current) {
                containerRef.current.setAttribute("data-is-scrolling", "false");
            }
        }, 300);

        if (containerRef.current) {
            containerRef.current.setAttribute("data-is-scrolling", "true");
        }
    };
    return (
        <div
            { ...props }    
            ref={ containerRef }
            className={ `${styles.container} ${className ?? ""}` }
            onScroll={ onScroll }
        >
            {
                children
            }
        </div>
    );
};

export default Container;