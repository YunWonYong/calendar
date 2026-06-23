import config from "@/config";
import { post } from "@/lib/fetch";

import { METHODS } from "@/domains/fetch/fetchConstants";

import type { HttpMethod } from "@/domains/fetch/fetchType";

const DEFAULT_HEADER = {
    "Content-Type": "application/json",
};

export const api = async <T,>(path: string, method: HttpMethod, body?: object, header?: Record<string, string>) => {
    if (!header) {
        header = DEFAULT_HEADER;
    }

    const url = getServerApiUrl(path);

    switch(method) {
        case METHODS.POST:
            return post<T>(url, body, header);
    }

    throw new Error(`not supported method[${method}]`);
};

export const getServerApiUrl = (path: string) => `${config.apiServerURL}${path}`;