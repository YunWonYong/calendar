import type { FC } from "react";

import { trackClickAndPreventDefault } from "@/analytics/button";
import useTheme from "@/hooks/theme/UseTheme";

import styles from "./ThemeToggleButton.module.css";

import type { ThemeToggleButtonProps } from "@/domains/theme/themeButtonType";

const ThemeToggleButton: FC<ThemeToggleButtonProps> = ({ className = "", source, displayMode }) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            type="button"
            className={ `${styles.themeToggleButton} ${className}` }
            data-display-mode={ displayMode }
            onClick={(event) => {
                trackClickAndPreventDefault(
                    event,
                    `THEME-TOGGLE-BUTTON@${source}`,
                    toggleTheme
                )
            }}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            aria-pressed={theme === "dark"}
        >
            <span
                className={styles.toggleBox}
                data-theme={theme}
            >
                <span className={styles.lightTheme} aria-hidden="true">
                    ☀️
                </span>
                <span className={styles.darkTheme} aria-hidden="true">
                    🌙
                </span>
            </span>
        </button>
    );
};

export default ThemeToggleButton;