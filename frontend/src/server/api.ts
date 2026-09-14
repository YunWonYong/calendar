import serverApiClient from "./client";

import type { AuthenticateApiParameterType } from "@/domains/server/serverType";

export const getLoginPath = (authProvider: string) => 
    serverApiClient.getApiUrl(`/oauth2/authorization/${authProvider}`);


type AuthenticateParams = { logoutCallback: () => void, data: AuthenticateApiParameterType; };

export const authenticate = async ({ data, logoutCallback }: AuthenticateParams) => {
    return serverApiClient.login(
        data,
        logoutCallback,
    );
};