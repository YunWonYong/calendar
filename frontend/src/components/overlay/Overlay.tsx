import type { FC, ReactNode } from "react";

import styles from "./Overlay.module.css";

const Overlay: FC<{ children: ReactNode; onClick?: () => void; }> = ({ children, onClick }) => {
    return (
        <div
            className={ styles.overlay }
            onClick={ onClick }
        >
            <div
                className={ styles.contentWrap }
            >
                {
                    children
                }
            </div>
        </div>
    );
};

export default Overlay;