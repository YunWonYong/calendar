import { createContext } from "react";

import type { ThemeContextType, ThemeType } from "@/domains/theme/themeTypes";

const ThemeContext = createContext<ThemeContextType>({
    currentTheme: "light",
    onChangeTheme: (_: ThemeType) => { throw new Error("check Theme provider."); },
});

export default ThemeContext;