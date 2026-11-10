import type { ComponentType } from "react";

import type { LocaleType } from "../locale/locale";

export type ModalContentPropsType<T> = {
    locale: LocaleType;
    props: T;
};

export type ModalContentType<T> = ComponentType<ModalContentPropsType<T>>;