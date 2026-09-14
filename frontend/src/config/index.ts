type Config = {
    apiServerURL: string;
    buildEnv: string;
    logLevel: number;
};

const config: Config = {
    apiServerURL: "",
    buildEnv: "",
    logLevel: 5,
};

export const initConfig = (): { errorMessage?: string; config: Config; } => {
    try {
        const apiServerURL = process.env.API_SERVER_URL;
        const buildEnv = process.env.BUILD_ENV;
        const logLevelStr = process.env.LOG_LEVEL;
        console.log("initConfig: ", apiServerURL, buildEnv);
        if (!apiServerURL || !buildEnv) {
            throw new Error("required config values.");
        }

        let logLevel = 5;
        if (logLevelStr) {
            const ll = parseInt(logLevelStr);
            if (!Number.isNaN(ll) && ll > 0 && ll < 6) {
                logLevel = ll;
            }
        }
        config.apiServerURL = apiServerURL;
        config.buildEnv = buildEnv;
        config.logLevel = logLevel;
        return { config };
    } catch(e) {
        let errorMessage = "config init failed.";
        if (e instanceof Error) {
            errorMessage = `${errorMessage} error: ${e.message}`;
        }
        return { errorMessage, config };
    }
};

export default config;