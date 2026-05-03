type Config = {
    apiServerURL: string;
    buildEnv: string;
};

const config: Config = {
    apiServerURL: "https://qwdnqopwdnoqwnd.qwdqwd.io",
    buildEnv: "live",
};

export const initConfig = (): string => {
    try {
        const apiServerURL = process.env.API_SERVER_URL;
        const buildEnv = process.env.BUILD_ENV;
    
        if (!apiServerURL || !buildEnv) {
            throw new Error("required config values.");
        }

        config.apiServerURL = apiServerURL;
        config.buildEnv = buildEnv;

        return "";
    } catch(e) {
        let errorMessage = "config init failed.";
        if (e instanceof Error) {
            errorMessage = `${errorMessage} error: ${e.message}`;
        }
        return errorMessage;
    }
};

export default config;