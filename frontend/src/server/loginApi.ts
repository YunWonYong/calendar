import { api, getServerApiUrl } from "./api";

import { METHODS } from "@/domains/fetch/fetchConstants";

import type { UserData } from "@/domains/user/userType";

export const getLoginPath = (authProvider: string) => 
    getServerApiUrl(`/oauth2/authorization/${authProvider}`);

export const login = async (authCode: string) => {
    return api<UserData>(
        "/auth",
        METHODS.POST,
        {
            authCode,
        },
    );
};
