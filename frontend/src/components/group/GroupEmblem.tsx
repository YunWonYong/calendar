
import GroupEmblemBG from "./GroupEmblemBG";
import GroupEmblemIconSVG from "./GroupEmblemIconSVG";

import type { BGId } from "@/domains/group/emblemBg";
import type { IconId } from "@/domains/group/emblemIcon";

interface GroupEmblemProps {
    emblemId: string;
    size?: number;
}

export const getGroupEmblemId = ({ bgId, iconId }: { bgId: BGId; iconId: IconId; }) => `${bgId}@_@${iconId}`;

const GroupEmblem = ({ emblemId, size = 44 }: GroupEmblemProps) => {
    const ids = emblemId.split("@_@");
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