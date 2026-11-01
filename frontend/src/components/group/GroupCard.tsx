import type { FC, HTMLAttributes } from "react";

import GroupEmblem from "./GroupEmblem";

import styles from "./GroupCard.module.css";

export type GroupCardDisplayType = "compact" | "full";

export interface GroupCardProps extends HTMLAttributes<HTMLDivElement> {
    emblemIconInfo: {
        type: "custom";
        defaultImageUrl: string;
        imageUrl: string;
    } | {
        type: "normal";
        emblemId: string;
    };
    groupFullName: string;
    groupShortName: string;
    displayType?: GroupCardDisplayType;
}

const GroupCard: FC<GroupCardProps> = ({
    emblemIconInfo,
    groupFullName,
    groupShortName,
    displayType = "full",
    className = "",
    ...props
}) => {
    const isCompact = displayType === "compact";
    const displayName = isCompact ? groupShortName : groupFullName;

    return (
        <div
            className={`${styles.wrap} ${className}`}
            data-display-type={ displayType }
            title={ groupFullName }
            role="button"
            tabIndex={0}
            {...props}
        >
            <div className={styles.emblemBox}>
                {
                    emblemIconInfo.type === "normal"
                        ?   <GroupEmblem
                                type={ emblemIconInfo.type }
                                id={ emblemIconInfo.emblemId }
                            />
                        :   <GroupEmblem
                                type={ emblemIconInfo.type }
                                url={ emblemIconInfo.imageUrl }
                                defaultUrl={ emblemIconInfo.defaultImageUrl }
                                alt={`${groupFullName} group emblem custom image`}
                            />
                }
            </div>
            
            <div className={ styles.nameBox }>
                <span className={ styles.nameText }>{ displayName }</span>
            </div>
        </div>
    );
};

export default GroupCard;