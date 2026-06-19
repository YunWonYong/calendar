import dotenv from "dotenv";


if (!process.env.BUILD_ENV) {
    throw new Error(`BUILD_ENV variable empty.`);
}

type WebpackBuildDevMode = {
    webpackBuildMode: "development";
    devServerPort: number;
};

type WebpackBuildProdMode = {
    webpackBuildMode: "production";
};

type BuildEnv = "local"| "dev"| "qa"| "live";

type BaseEnvFileConfg = {
    apiServerURL: string;
    buildEnv: BuildEnv;
};

type EnvFileConfig = BaseEnvFileConfg  & (WebpackBuildDevMode | WebpackBuildProdMode);

const buildEnv = process.env.BUILD_ENV || "";

const buildEnvs: string[] = ["local", "dev", "qa", "live"];
if (!buildEnvs.includes(buildEnv)) {
    throw new Error(`BUILD_ENV invalid.`);
}

const configPath = `.env.${buildEnv}`;

const envFileConfig = dotenv.config({
    path: configPath,
}).parsed;

if (!envFileConfig) {
    throw new Error(`env file not found. ${configPath}`);
}

if (!envFileConfig["WEBPACK_BUILD_MODE"]) {
    throw new Error(`WEBPACK_BUILD_MODE variable empty. file: ${configPath}`);
}

if (!envFileConfig["SERVER_URL"]) {
    throw new Error(`SERVER_URL variable empty. file: ${configPath}`);
}

const webpackBuildMode: "development"| "production" | string = envFileConfig["WEBPACK_BUILD_MODE"];
if (!webpackBuildMode || (webpackBuildMode !== "development" && webpackBuildMode !== "production")) {
    throw new Error(`WEBPACK_BUILD_MODE invalid. file: ${configPath}`);
}

const baseConfig: BaseEnvFileConfg = {
    buildEnv: buildEnv as BuildEnv,
    apiServerURL: envFileConfig["SERVER_URL"],
};


const makeConfig = (baseConfig: BaseEnvFileConfg, webpackBuildMode: "development" | "production"): EnvFileConfig => {
    if (webpackBuildMode === "development") {
        let port = 3000;
        if (envFileConfig["WEBPACK_DEV_SERVER_PORT"]) {
            const configPort = parseInt(envFileConfig["WEBPACK_DEV_SERVER_PORT"]);
            if (!Number.isNaN(configPort)) {
                port = configPort;
            }
        }
        return {
            ...baseConfig,
            webpackBuildMode,
            devServerPort: port,
        };
    }

    return {
        ...baseConfig,
        webpackBuildMode,
    };
};

const config: EnvFileConfig = makeConfig(baseConfig, webpackBuildMode);

export default config;