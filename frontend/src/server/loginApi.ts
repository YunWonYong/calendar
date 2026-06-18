import { getServerApiUrl } from "./api";

export const getLoginPath = (authProvider: string) => 
    getServerApiUrl(`/oauth2/authorization/${authProvider}`);
