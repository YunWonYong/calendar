import { createContext } from "react";

import type { ThemeContextType, ThemeType } from "@/domains/theme/themeTypes";

const ThemeContext = createContext<ThemeContextType | null>(null);

export default ThemeContext;