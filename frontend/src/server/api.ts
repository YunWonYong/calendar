import config from "@/config";

export const getLoginPath = (authProvider: string) => `${config.apiServerURL}/oauth2/authorization/${authProvider}`;
