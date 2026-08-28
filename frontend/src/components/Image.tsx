import { FC, useEffect, useState } from "react";

import type { DefaultImageProps, ImageProps } from "@/domains/component/Image";

const Image: FC<ImageProps> = (props) => {
    const { src, defaultSrc, alt } = props;
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    useEffect(() => {
        setIsLoading(true);
    }, [src]);

    const className = props.className || "";
    const onLoadingHandler = () => {
        setIsLoading(false);
    };
    return (
        <div
            style={{
                position: "relative"
            }}
        >
            {
                isLoading &&
                    <div style={{ position: "absolute", inset: 0, opacity: 0.3 }}></div>
            }
            {
                src && defaultSrc
                    ?   <DefaultImage
                            className={ className }
                            src={ src }
                            defaultSrc={ defaultSrc }
                            alt={ alt }
                            onLoadingHandler={ onLoadingHandler }
                        />
                    :   <img
                            className={ className }
                            src={ src }
                            alt={ alt }
                            onLoad={ onLoadingHandler }
                        />
            }
        </div>
    );
};

const DefaultImage = ({ className, src, defaultSrc, alt, onLoadingHandler }: DefaultImageProps) => {
    const [ imageSrc, setImageSrc ] = useState<string>(src);
    useEffect(() => {
        setImageSrc(src || defaultSrc);
    }, [src, defaultSrc]);
    return (
        <img
            className={ className }
            src={ imageSrc }
            alt={ alt }
            onLoad={ onLoadingHandler }
            onError={() => {
                if (imageSrc === defaultSrc) {
                    return;
                }
                setImageSrc(defaultSrc);
            }}
        />
    );
};
export default Image;