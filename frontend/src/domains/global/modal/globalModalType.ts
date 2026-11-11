import type { ComponentType } from "react";

import type { OpenGlobalOverlayOptions } from "../overlay/globalOverlayType";

export type ModalOptions = { 
    useCloseButton?: boolean; 
} & OpenGlobalOverlayOptions;

export type ModalContentPropsType<T> = {
    props: T;
};

export type ModalContentType<T> = ComponentType<ModalContentPropsType<T>>;