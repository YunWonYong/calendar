import { useCallback, useContext } from "react";
import ThemeContext from "@/contexts/theme/ThemeContext";

import type { ThemeContextType } from "@/domains/theme/themeTypes";


const useTheme = () => {
    const ctx = useContext<ThemeContextType | null>(ThemeContext);
    if (!ctx) {
        throw new Error("useTheme must be used within ThemeProvider");
    }

    const { currentTheme, onChangeTheme } = ctx;
    const toggleTheme = useCallback(() => {
        const changeTheme = currentTheme === "dark"? "light": "dark";
        onChangeTheme(changeTheme);
    }, [ currentTheme ]);
    return { 
        theme: currentTheme,
        toggleTheme,
    };
};

export default useTheme;