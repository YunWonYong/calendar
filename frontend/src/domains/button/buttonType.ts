import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonProps = {
    eventName: string;
    title?: string;
    onClick: () => void | Promise<void>;
    size?: ButtonSize;
    color?: ButtonColor;
    children?: ReactNode;
    isBarButtonType?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const BUTTON_SIZE = {
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large"
} as const;
export type ButtonSize = typeof BUTTON_SIZE[keyof typeof BUTTON_SIZE];

export const BUTTON_COLOR = {
    RED: "red",
    BLUE: "blue",
    GREEN: "green",
    DEFAULT: "default",
    PURPLE: "purple",
    AMBER: "amber",
    SLATE: "slate",
    TEAL: "teal",
    PINK: "pink"
} as const;
export type ButtonColor = typeof BUTTON_COLOR[keyof typeof BUTTON_COLOR];