export const LOCALE = {
    KR: "KR",
    JP: "JP",
    ZH: "ZH",
    EN: "EN"
} as const;

export type LocaleType = typeof LOCALE[keyof typeof LOCALE];

export type LocaleLabelType = {
    label: string;
    code: string;
};

export const LOCALE_LABEL_DATAS: Record<LocaleType, LocaleLabelType> = {
    [LOCALE.KR]: {
        label: "한국어",
        code: "KR",
    },
    [LOCALE.EN]: {
        label: "ENG",
        code: "EN",
    },
    [LOCALE.JP]: {
        label: "日本語",
        code: "JP",
    },
    [LOCALE.ZH]: {
        label: "中文",
        code: "CN",
    },
};

export type LocaleContextType = {
    locale: LocaleType;
    orderedLocaleList: LocaleType[];
    otherLocaleList: LocaleType[];
    changeLocale: (locale: LocaleType) => void;
};