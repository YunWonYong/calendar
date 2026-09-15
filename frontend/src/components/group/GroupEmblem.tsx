import { BG_THEMES } from "@/domains/group/emblemBg";

import GroupEmblemIconSVG from "./GroupEmblemIconSVG";

import styles from "./GroupEmblem.module.css";

interface GroupEmblemProps {
    emblemId: string;
    size?: number;
}

const GroupEmblem = ({ emblemId, size = 44 }: GroupEmblemProps) => {
    // 없으면 데이터 오류라 죽어야 함.
    const ids = emblemId.split("@_@");
    const [ bgId, iconId ] = ids;
    const theme = BG_THEMES[bgId];

    return (
        <div
            className={styles.emblem}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                background: theme.background,
                color: theme.color,
            }}
        >
            <GroupEmblemIconSVG
                iconId={iconId}
                style={{
                    width: `${size * 0.48}px`,
                    height: `${size * 0.48}px`,
                }}
            />
        </div>
    );
};

export default GroupEmblem;