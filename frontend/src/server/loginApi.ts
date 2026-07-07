import { api, getServerApiUrl } from "./api";

import { METHODS } from "@/domains/fetch/fetchConstants";

import type { UserData } from "@/domains/user/userType";
import type { LoginRequestBody } from "@/domains/server/serverType";

export const getLoginPath = (authProvider: string) => 
    getServerApiUrl(`/oauth2/authorization/${authProvider}`);

export const login = async (body: LoginRequestBody) => {
    return api<UserData>(
        "/auth",
        METHODS.POST,
        body
    );
};
