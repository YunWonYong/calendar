import { FC, HTMLAttributes } from "react";

import Image from "../Image";
import styles from "./GroupCard.module.css";
import GroupEmblem from "./GroupEmblem";

export type GroupCardDisplayType = "compact" | "full";

export interface GroupCardProps extends HTMLAttributes<HTMLDivElement> {
    emblemIconInfo: {
        type: "custom";
        defaultImageUrl: string;
        imageUrl: string;
    } | {
        type: "emblem";
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
                    emblemIconInfo.type === "emblem"
                        ?   <GroupEmblem
                                emblemId={ emblemIconInfo.emblemId }
                            />
                        :   <Image
                                src={ emblemIconInfo.imageUrl }
                                defaultSrc={ emblemIconInfo.defaultImageUrl }
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