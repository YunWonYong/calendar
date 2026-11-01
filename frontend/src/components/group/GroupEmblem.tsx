
import type { FC } from "react";

import { GROUP_EMBLEM_TYPE } from "@/domains/group/form";

import Image from "../Image";

import GroupEmblemBG from "./GroupEmblemBG";
import GroupEmblemIconSVG from "./GroupEmblemIconSVG";

import type { BGId } from "@/domains/group/emblemBg";
import type { IconId } from "@/domains/group/emblemIcon";
import type { GroupEmblemTypes } from "@/domains/group/form";

type GroupEmblemProp<T extends GroupEmblemTypes, D> = {
    type: T;
    size?: number;
    containerClassName?: string;
} & D;

type GroupEmblemProps = 
    GroupEmblemProp<"normal", { id: string; }> |
    GroupEmblemProp<"custom", { url: string; defaultUrl?: string; alt: string; }>

export const getGroupEmblemId = ({ bgId, iconId }: { bgId: BGId; iconId: IconId; }) => `${bgId}@_@${iconId}`;

const GroupEmblem: FC<GroupEmblemProps> = (props) => {
    const { type, size = 44, containerClassName = "" } = props;
    return (
        <div
            className={ containerClassName }
        >
            {
                type === GROUP_EMBLEM_TYPE.NORMAL
                    ?   <GroupNormalEmblem 
                            size={ size }
                            id={ props.id }
                        />
                    :   <Image
                            src={ props.url }
                            alt={ props.alt }
                            defaultSrc={ props.defaultUrl }
                        />
            }
        </div>
    );
};

const GroupNormalEmblem: FC<{ size: number; id: string; }> = ({ size, id }) => {
    const ids = id.split("@_@");
    const [ bgId, iconId ] = ids;
    return (
        <GroupEmblemBG
            bgId={ bgId as BGId }
            size={ size }
        >
            <GroupEmblemIconSVG
                iconId={iconId as IconId}
                style={{
                    width: `${size * 0.48}px`,
                    height: `${size * 0.48}px`,
                }}
            />
        </GroupEmblemBG>
    );
};

export default GroupEmblem;