import type { FC, ReactNode } from "react";
import { useMemo, useState } from "react";

import { LOCALE } from "@/domains/locale/locale";
import { getLocaleFromLocalStorage, saveLocaleFromLocalStorage } from "@/localStorage/api";

import LocaleContext from "./LocaleContext";

import type { LocaleType } from "@/domains/locale/locale";

const getDefaultLocale = (): LocaleType => {
    const languages = navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language];

    for (const language of languages) {
        const normalizedLanguage = language.toLowerCase();

        if (normalizedLanguage.startsWith("ko")) {
            return LOCALE.KR;
        }

        if (normalizedLanguage.startsWith("ja")) {
            return LOCALE.JP;
        }

        if (normalizedLanguage.startsWith("zh")) {
            return LOCALE.ZH;
        }

        if (normalizedLanguage.startsWith("en")) {
            return LOCALE.EN;
        }
    }

    return LOCALE.KR;
};

const LocaleProvider: FC<{ children: ReactNode; }> = ({ children }) => {
    const [locale, setLocale] = useState<LocaleType>(() => {
        const savedLocale = getLocaleFromLocalStorage();
        if (savedLocale) {
            return savedLocale;
        }

        const defaultLocale = getDefaultLocale();
        saveLocaleFromLocalStorage(defaultLocale);
        return defaultLocale;
    });

    const orderedLocaleList = useMemo(() => {
        return [
            LOCALE.KR,
            LOCALE.EN,
            LOCALE.ZH,
            LOCALE.JP
        ];
    }, []);

    const changeLocale = (changeLocale: LocaleType) => {
        if (locale === changeLocale) {
            return;
        }

        saveLocaleFromLocalStorage(changeLocale);
        setLocale(changeLocale);
    };

    return (
        <LocaleContext.Provider
            value={{
                locale,
                orderedLocaleList,
                changeLocale
            }}
        >
            {
                children
            }
        </LocaleContext.Provider>
    );
};

export default LocaleProvider;