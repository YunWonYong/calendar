export const THEME_TYPES = {
    LIGHT: "light",
    DARK: "dark",
} as const;

export type ThemeType = typeof THEME_TYPES[keyof typeof THEME_TYPES];

export type ThemeContextType = {
    currentTheme: ThemeType;
    onChangeTheme: (theme: ThemeType) => void;
    isDarkTheme: boolean;
};