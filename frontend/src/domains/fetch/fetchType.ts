import { METHODS } from "./fetchConstants";

type SuccessResponse<T> = {
    ok: true;
    data: T;
};

type FailedResponse = {
    ok: false;
    errorMessage: string;
};

export type ApiResponse<T> = SuccessResponse<T> | FailedResponse;

export type HttpMethod = typeof METHODS[keyof typeof METHODS];