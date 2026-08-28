export type ImageProps = {
    src: string;
    defaultSrc?: string;
    alt: string;
    className?: string;
};

export type DefaultImageProps = {
    src: string;
    defaultSrc: string;
    alt: string;
    className?: string;
    onLoadingHandler: () => void;
};