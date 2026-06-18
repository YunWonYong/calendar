import useTheme from "@/hooks/theme/UseTheme";
import { trackClickAndPreventDefault } from "@/analytics/button";

import styles from "./LobbyAsideThemeToggleButton.module.css";
import type { LobbyAsideState } from "../LobbyTypes";

const LobbyAsideThemeToggleButton = ({ asideState }: { asideState: LobbyAsideState; }) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div
            className={ styles.wrap }
            onClick={(event) => {
                trackClickAndPreventDefault(
                    event,
                    "LOBBY-ASIDE-THEME-TOGGLE",
                    toggleTheme,
                );
            }}
            data-display-type={ asideState }
        >
            <div
                className={ styles.toggleBox }
                data-theme={ theme }
            >
                <span
                    className={ styles.lightTheme }
                    data-theme={ theme }
                >
                    ☀️
                </span>
                <span
                    className={ styles.darkTheme }
                    data-theme={ theme }
                >
                    🌙
                </span>
            </div>
        </div>
    );
};

export default LobbyAsideThemeToggleButton;