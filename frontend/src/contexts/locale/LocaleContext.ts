import { createContext } from "react";

import { LOCALE } from "@/domains/locale/locale";
import NotInitializedError from "@/lib/context/NotInitializedError";

import type { LocaleContextType, LocaleType } from "@/domains/locale/locale";

const LocaleContext = createContext<LocaleContextType>({
    locale: LOCALE.KR,
    orderedLocaleList: [],
    otherLocaleList: [],
    changeLocale: (_: LocaleType) => { throw new NotInitializedError("LocaleContext"); }
});

export default LocaleContext;