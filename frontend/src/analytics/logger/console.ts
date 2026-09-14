import { BaseLogger, ILogger, LOG_LEVELS, LOG_TYPES } from "@/domains/logger/loggerType";

class Logger extends BaseLogger {
    constructor(logLevel: number) {
        super(logLevel);
    }

    public debug(...args: unknown[]) {
        if (super.shouldLog(LOG_TYPES.DEBUG)) {
            console.debug(...args);
        }
    }

    public log(...args: unknown[]) {
        if (super.shouldLog(LOG_TYPES.LOG)) {
            console.log(...args);
        }
    }

    public warn(...args: unknown[]) {
        if (super.shouldLog(LOG_TYPES.WARN)) {
            console.warn(...args);
        }
    }

    public error(...args: unknown[]) {
        if (super.shouldLog(LOG_TYPES.ERROR)) {
            console.error(...args);
        }
    }
};

let consoleLogger: ILogger = new Logger(LOG_LEVELS.NONE);

export const initConsoleLogger = (logLevel: number) => {
    try {
        const lg = new Logger(logLevel);
        consoleLogger = lg;
        console.log("console logger type: ", lg.getLogType());
        return { consoleLogger };
    } catch(e) {
        return { consoleLogger, errorMessage: (e as Error).message };
    }
};

export default consoleLogger;