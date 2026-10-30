import type { FC, ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";

import styles from "./InformationButtonBox.module.css";

const InformationButtonBox: FC<{ children: ReactNode }> = ({ children }) => {
    const id = useId();
    const boxRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent) => {
            if (
                boxRef.current &&
                !boxRef.current.contains(event.target as Node)
            ) {
                setIsVisible(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsVisible(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div
            ref={ boxRef }
            className={ styles.infoBoxWrap }
        >
            <span
                className={ styles.infoButton }
                aria-label="Information"
                aria-expanded={ isVisible }
                aria-controls={ id }
                onClick={ () => setIsVisible(old => !old) }
            >
                i
            </span>

            <div
                id={ id }
                className={ `${styles.infoBox} ${isVisible ? styles.visibility : ""}` }
            >
                { children }
            </div>
        </div>
    );
};

export default InformationButtonBox;