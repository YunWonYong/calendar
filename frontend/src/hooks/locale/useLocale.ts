import { useContext } from "react";

import LocaleContext from "@/contexts/locale/LocaleContext";

import type { LocaleContextType } from "@/domains/locale/locale";

const useLocale = () => {
    const ctx = useContext<LocaleContextType>(LocaleContext);
    return ctx;
};

export default useLocale;