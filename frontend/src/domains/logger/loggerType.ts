export const LOG_TYPES = {
    DEBUG: "DEBUG",
    LOG: "LOG",
    WARN: "WARN",
    ERROR: "ERROR",
    NONE: "NONE",
} as const; 

export const LOG_LEVELS = {
    DEBUG: 1,
    LOG: 2,
    WARN: 3,
    ERROR: 4,
    NONE: 5,
} as const; 

export type LogType = typeof LOG_TYPES[keyof typeof LOG_TYPES];

export const logLevelByType: Record<LogType, number> = {
    DEBUG: 1,
    LOG: 2,
    WARN: 3,
    ERROR: 4,
    NONE: 5, // 모든 로그 비활성화
} as const;

export const logTypeByLevel: Record<number, LogType> = {
    1: "DEBUG",
    2: "LOG",
    3: "WARN",
    4: "ERROR",
    5: "NONE",
} as const;

export interface ILogger {
    getLogType(): string;
    debug(...args: unknown[]): void;
    log(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    error(...args: unknown[]): void;
}

export abstract class BaseLogger implements ILogger {
    private logLevel: number;
    private logType: LogType;
    constructor(logLevel: number) {
        this.logLevel = logLevel;
        const logType = logTypeByLevel[logLevel];

        if (!logType) {
            throw new Error(`invalid logLevel. logLevel[${logLevel}]`);
        }

        this.logType = logType;
    }

    protected shouldLog(targetLogType: LogType): boolean {
        return logLevelByType[targetLogType] >= this.logLevel;
    }

    public getLogType() {
        return this.logType;
    }

    public abstract debug(...args: unknown[]): void;
    public abstract log(...args: unknown[]): void;
    public abstract warn(...args: unknown[]): void;
    public abstract error(...args: unknown[]): void;
}