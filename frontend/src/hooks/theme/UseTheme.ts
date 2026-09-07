import { useCallback, useContext } from "react";
import ThemeContext from "@/contexts/theme/ThemeContext";

import { THEME_TYPES, type ThemeContextType } from "@/domains/theme/themeTypes";


const useTheme = () => {
    const ctx = useContext<ThemeContextType | null>(ThemeContext);
    if (!ctx) {
        throw new Error("useTheme must be used within ThemeProvider");
    }

    const { currentTheme, onChangeTheme, isDarkTheme } = ctx;
    const toggleTheme = useCallback(() => {
        const changeTheme = currentTheme === THEME_TYPES.DARK? THEME_TYPES.LIGHT: THEME_TYPES.DARK;
        onChangeTheme(changeTheme);
    }, [ currentTheme ]);
    return { 
        theme: currentTheme,
        toggleTheme,
        isDarkTheme, 
    };
};

export default useTheme;