import { api, getServerApiUrl } from "./api";

import { METHODS } from "@/domains/fetch/fetchConstants";

import type { AutoLoginRequestBody, LoginRequestBody, LoginResponseBody } from "@/domains/server/serverType";

export const getLoginPath = (authProvider: string) => 
    getServerApiUrl(`/oauth2/authorization/${authProvider}`);

export const login = async (body: LoginRequestBody) => {
    return api<LoginResponseBody>(
        "/auth",
        METHODS.POST,
        body,
    );
};

export const autoLogin = async (body: AutoLoginRequestBody) => {
    return api<LoginResponseBody>(
        "/auth/auto-login",
        METHODS.POST,
        body,
    );
};