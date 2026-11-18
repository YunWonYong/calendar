import { isNullOrUndefined } from "../validation/validation";

import type { HttpMethod } from "@/domains/fetch/fetchType";
import type { ServerApiClientOptions } from "@/domains/server/serverType";

export const getAbortController = (timeoutMs: number) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, timeoutMs);
    return {
        controller,
        timeoutId,
        signal: controller.signal,
    };
};

export const request = (url: string, method: HttpMethod, body?: object, header?: HeadersInit, opts?: ServerApiClientOptions): Promise<Response> => {
    const headers = new Headers(header);

    const init: RequestInit  = {
        method,
    };
    

    if (!isNullOrUndefined(body)) {
        if (body instanceof FormData) {
            init.body = body;
            headers.delete("Content-Type");
        } else {
            init.body = JSON.stringify(body);

            if (!headers.has("Content-Type")) {
                headers.set("Content-Type", "application/json");
            }
        }
    }

    if (opts && opts.signal) {
        init.signal = opts.signal;
    }

    init.headers = headers;
    return fetch(
        url,
        init,    
    );
};