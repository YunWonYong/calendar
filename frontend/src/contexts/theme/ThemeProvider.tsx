
import { FC, ReactNode, useCallback, useState } from "react";

import { getThemeFromLocalStorage, saveThemeFromLocalStorage } from "@/localStorage/api";

import ThemeContext from "./ThemeContext";

import { THEME_TYPES, type ThemeType } from "@/domains/theme/themeTypes";

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [ theme, setTheme ] = useState<ThemeType>(() => {
        const savedTheme = getThemeFromLocalStorage();
        if (savedTheme !== null) {
            return savedTheme;
        }

        let newTheme: ThemeType = THEME_TYPES.LIGHT;
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            newTheme = THEME_TYPES.DARK;
        }

        saveThemeFromLocalStorage(newTheme);
        return newTheme;
    });

    const onChangeTheme = useCallback((theme: ThemeType) => {
        if (theme !== THEME_TYPES.LIGHT && theme !== THEME_TYPES.DARK) {
            return;
        }

        saveThemeFromLocalStorage(theme);
        setTheme(theme);
    }, []);
    return (
        <ThemeContext.Provider 
            value={{ 
                currentTheme: theme, 
                onChangeTheme, 
                isDarkTheme: theme === THEME_TYPES.DARK,
            }}
        >
            <div
                id="theme--context"
                data-theme={ theme }
            >
                {
                    children 
                }
            </div>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;