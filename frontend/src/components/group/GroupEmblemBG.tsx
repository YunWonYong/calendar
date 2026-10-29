import type { CSSProperties, FC, ReactNode } from "react";

import { BG_THEMES } from "@/domains/group/emblemBg";

import styles from "./GroupEmblemBG.module.css";

import type { BGId } from "@/domains/group/emblemBg";

const GroupEmblemBG: FC<{ bgId: BGId; size?: number; children?: ReactNode; }> = ({ bgId, size, children }) => {
    const { background, color } = BG_THEMES[bgId];
    const style: CSSProperties = {
        background,
        color,
        width: "100%",
        height: "100%"
    };

    if (size) {
        const sizePx = `${size}px`;
        style.width = sizePx;
        style.height = sizePx;
    }

    return (
        <div
            id={ bgId }
            className={ styles.emblem }
            style={ style }
        >
            {
                children
                    ? children
                    : null
            }
        </div>
    );
};

export default GroupEmblemBG;