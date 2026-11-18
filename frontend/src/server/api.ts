import { METHODS } from "@/domains/fetch/fetchConstants";
import { isNullOrUndefined } from "@/lib/validation/validation";

import serverApiClient from "./client";

import type { PlansResponseBody } from "@/domains/plan/planResponseBodyType";
import type { AuthenticateApiParameterType, ServerApiClientOptions } from "@/domains/server/serverType";
import type { UsersResponseBody } from "@/domains/user/userType";

export const getLoginPath = (authProvider: string) => 
    serverApiClient.getApiUrl(`/oauth2/authorization/${authProvider}`);


type AuthenticateParams = { logoutCallback: () => void, data: AuthenticateApiParameterType; };

export const authenticate = async ({ data, logoutCallback }: AuthenticateParams, opts?: ServerApiClientOptions) => {
    return serverApiClient.login(
        data,
        logoutCallback,
        opts,
    );
};

export const fetchPlans = async (opts?: ServerApiClientOptions) => {
    return serverApiClient.call<undefined, PlansResponseBody>(
        METHODS.GET,
        "/plans",
        undefined,
        undefined,
        opts,
    );
};

export const createGroup = async (body: FormData, opts?: ServerApiClientOptions) => {
    return await serverApiClient.authCall(
        METHODS.POST,
        "/groups",
        body,
        undefined,
        opts,
    );
};

type SearchUsersParams = {
    searchValue: string;
    searchType?: "nickname" | "tag";
    page?: number;
    limit?: number;
};

export const searchUsers = async (params: SearchUsersParams, opts?: ServerApiClientOptions) => {
    const { searchValue, limit, page, searchType = "nickname" } = params;
    const queryParams: string[][] = [
        ["searchValue", searchValue]
    ];

    if (searchType) {
        queryParams.push(["searchType", searchType]);
    }

    if (!isNullOrUndefined(page)) {
        queryParams.push(["page", String(page)]);
    }

    if (!isNullOrUndefined(limit)) {
        queryParams.push(["limit", String(limit)]);
    }

    return await serverApiClient.authCall<undefined, UsersResponseBody>(
        METHODS.GET,
        `/users?${queryParams.map((param) => param.join("=")).join("&")}`,
        undefined,
        undefined,
        opts
    );
};