export const LOCALE = {
    KR: "KR",
    JP: "JP",
    ZH: "ZH",
    EN: "EN"
} as const;

export type LocaleType = typeof LOCALE[keyof typeof LOCALE];
