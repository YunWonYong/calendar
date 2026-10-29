export const DisplayMode = {
    CIRCLE: "circle",
    PILL: "pill"
} as const;

type DisplayModeType = typeof DisplayMode[keyof typeof DisplayMode];

export type ThemeToggleButtonProps = {
    className?: string;
    source: string;
    displayMode: DisplayModeType;
};