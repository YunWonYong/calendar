import type { ReactNode } from "react";

import type { ErrorCodeData } from "../fetch/fetchType";
import type { ModalContentType, ModalOptions } from "../global/modal/globalModalType";

export const ERROR_MOTION_TYPE = {
    MODAL: "modal",
    CUSTOM: "custom",
} as const;

type ErrorMotionData = 
    {
        errorMotionType: typeof ERROR_MOTION_TYPE.MODAL;
        Content: ModalContentType<ErrorCodeData>; 
        options?: ModalOptions;
    } |
    {
        errorMotionType: typeof ERROR_MOTION_TYPE.CUSTOM;
        data: ErrorCodeData;
    };

type UseServerApiLoadingOption = 
    {
        isLoading: true;
        Content: ReactNode;
    } |
    {
        isLoading: false;
    };

export type UseServerApiParamType<R> = {
    api: () => Promise<R | ErrorCodeData>;
    loadingOption?: UseServerApiLoadingOption;
} & ErrorMotionData;

export const isErrorCodeData = (data: unknown): data is ErrorCodeData => {
    return (
        typeof data === "object" &&
        data !== null &&
        "errorCode" in data &&
        typeof data.errorCode === "string"
    );
};

export type ServerApiResult<R> =
    | {
        isDuplicated: true;
        isError: false;
        isModalOpen: false;
        data: null;
    }
    | {
        isDuplicated: false;
        isError: true;
        isModalOpen: boolean;
        data: ErrorCodeData;
    }
    | {
        isDuplicated: false;
        isError: false;
        isModalOpen: false;
        data: R;
    };