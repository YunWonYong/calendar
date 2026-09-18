import { METHODS } from "@/domains/fetch/fetchConstants";

import type { ApiResponse, HttpMethod } from "@/domains/fetch/fetchType";

export const post = async <T, >(url: string, body?: object, header?: HeadersInit) => {
    return request<T>(url, METHODS.POST, body, header);
};

const request = async <T, >(url: string, method: HttpMethod, body?: object, header?: HeadersInit): Promise<ApiResponse<T>> => {
    const init: RequestInit  = {
        method,
    };

    if (body) {
        init.body = JSON.stringify(body);
    }

    if (header) {
        init.headers = header;
    }

    try {
        const response = await fetch(
            url,
            init,    
        );

        if (response.status === 401) {
            return getUnauthorizedResponse(response.json());
        }

        if (!response.ok) {
            throw new Error(`failed to api call. ${response.status}/${response.statusText}`);
        }

        const data = await response.json();
        return {
            ok: true,
            ...data,
        };
    } catch (e) {
        // [TODO] error logging
        return {
            ok: false,
            errorMessage: getErrorMessage(url, method, e),
            isRefresh: false,
        };
    }
};

const getUnauthorizedResponse = async (json: Promise<any>) => {
    const data = await json;

    if ("ok" in data && "errorCode" in data) {
        const { ok, errorCode } = data;
        // [TODO] accessToken이 만료 됐을 때의 errorCode를 체크해서 refresh api 호출할 수 있도록 수정. 
        return {
            ok,
            errorCode: errorCode as string,
            errorMessage: "UNAUTHORIZED",
            isRefresh: false,
        };
    }

    return {
        ok: false,
        errorCode: "UNAUTHORIZED",
        errorMessage: "UNAUTHORIZED",
        isRefresh: false,
    };
};

const getErrorMessage = (url: string, method: HttpMethod, e: unknown) => {
    let msg = `errorMessage[%s] method[${method}] url[${url}]`;

    if (e instanceof Error) {
        msg = msg.replace("%s", e.message);
    } else {
        msg = msg.replace("%s", String(e));
    }

    return msg;
};