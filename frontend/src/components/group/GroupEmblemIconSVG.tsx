import { SVGProps } from "react";

import { ICON_PRESETS } from "@/domains/group/emblemIcon";

interface GroupEmblemIconSVGProps extends SVGProps<SVGSVGElement> {
    iconId: string;
}

const GroupEmblemIconSVG = ({ iconId, ...props }: GroupEmblemIconSVGProps) => {
    const preset = ICON_PRESETS[iconId];
    return (
        <svg
            viewBox="0 0 128 128"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {preset.shapes.map((shape, idx) => {
                switch (shape.type) {
                    case "path":
                        return <path key={idx} {...shape.props} />;
                    case "circle":
                        return <circle key={idx} {...shape.props} />;
                    case "rect":
                        return <rect key={idx} {...shape.props} />;
                    case "line":
                        return <line key={idx} {...shape.props} />;
                    case "polygon":
                        return <polygon key={idx} {...shape.props} />;
                    case "polyline":
                        return <polyline key={idx} {...shape.props} />;
                    default:
                        return null;
                }
            })}
        </svg>
    );
};

export default GroupEmblemIconSVG;