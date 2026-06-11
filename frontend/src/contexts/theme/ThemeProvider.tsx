
import { FC, ReactNode, useCallback, useState } from "react";

import { getThemeFromLocalStorage, saveThemeFromLocalStorage } from "@/localStorage/api";

import ThemeContext from "./ThemeContext";

import type { ThemeType } from "@/domains/theme/themeTypes";

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [ theme, setTheme ] = useState<ThemeType>(() => {
        const savedTheme = getThemeFromLocalStorage();
        if (savedTheme !== null) {
            return savedTheme;
        }

        let newTheme: ThemeType = "light";
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            newTheme = "dark";
        }

        saveThemeFromLocalStorage(newTheme);
        return newTheme;
    });

    const onChangeTheme = useCallback((theme: ThemeType) => {
        if (theme !== "light" && theme !== "dark") {
            return;
        }

        saveThemeFromLocalStorage(theme);
        setTheme(theme);
    }, []);
    return (
        <ThemeContext.Provider 
            value={{ currentTheme: theme, onChangeTheme }}
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