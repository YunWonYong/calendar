import type { METHODS } from "./fetchConstants";

type SuccessResponse<T> = {
    ok: true;
    data: T;
};

export type ErrorCodeData = {
    errorCode: string;
};
export type FailedResponse = {
    ok: false;
    isRefresh?: boolean;
} & ErrorCodeData;

export type ApiResponse<T> = SuccessResponse<T> | FailedResponse;

export type HttpMethod = typeof METHODS[keyof typeof METHODS];