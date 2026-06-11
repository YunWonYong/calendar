export type ThemeType = "light" | "dark";

export type ThemeContextType = {
    currentTheme: ThemeType;
    onChangeTheme: (theme: ThemeType) => void;
};