import type { ReactNode } from "react";

import type { ErrorCodeData } from "../fetch/fetchType";
import type { ModalContentType, ModalOptions } from "../global/modal/globalModalType";

import type { ServerApiClientOptions } from "./serverType";

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
    api: (opts: ServerApiClientOptions) => Promise<R | ErrorCodeData>;
    loadingOption?: UseServerApiLoadingOption;
    timeoutMs?: number;
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
        isSuccess: false;
        isDuplicated: true;
        isError: false;
        isModalOpen: false;
        data: null;
    }
    | {
        isSuccess: false;
        isDuplicated: false;
        isError: true;
        isModalOpen: boolean;
        data: ErrorCodeData;
    }
    | {
        isSuccess: true;
        isError: false;
        isModalOpen: boolean;
        data: R;
    };