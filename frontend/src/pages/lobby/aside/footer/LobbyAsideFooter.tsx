
import ThemeToggleButton from "@/components/theme/ThemeToggleButton";

import styles from "./LobbyAsideFooter.module.css";

import type { LobbyAsideState } from "../../LobbyTypes";

const LobbyAsideFooter = ({ asideState }: { asideState: LobbyAsideState }) => {
    return (
        <footer
            className={ styles.footer }
        >
            <ThemeToggleButton
                source="LOBBY_ASIDE"
                displayMode={ asideState === "expanded"? "pill": "circle" }
            />
        </footer>
    );
};

export default LobbyAsideFooter;