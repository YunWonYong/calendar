import type { FC } from "react";

import useTheme from "@/hooks/theme/UseTheme";
import logoLightImage from "@/assets/logo/logo_light.png";
import logoDarkImage from "@/assets/logo/logo_dark.png";

import Image from "./Image";


const LogoImage: FC<{ className?: string }> = ({ className }) => {
    const { isDarkTheme } = useTheme();
    return (
        <Image
            src={ isDarkTheme? logoDarkImage: logoLightImage } 
            alt="our calendar logo"
            className={ className }
        />
    );    
};

export default LogoImage;