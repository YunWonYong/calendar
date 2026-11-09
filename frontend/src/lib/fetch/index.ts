import { isNullOrUndefined } from "../validation/validation";

import type { HttpMethod } from "@/domains/fetch/fetchType";

export const request = (url: string, method: HttpMethod, body?: object, header?: HeadersInit): Promise<Response> => {
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

    init.headers = headers;
    return fetch(
        url,
        init,    
    );
};