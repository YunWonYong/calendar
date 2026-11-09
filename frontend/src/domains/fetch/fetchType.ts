import type { METHODS } from "./fetchConstants";

type SuccessResponse<T> = {
    ok: true;
    data: T;
};

export type FailedResponse = {
    ok: false;
    errorCode: string;
    isRefresh?: boolean;
};

export type ApiResponse<T> = SuccessResponse<T> | FailedResponse;

export type HttpMethod = typeof METHODS[keyof typeof METHODS];