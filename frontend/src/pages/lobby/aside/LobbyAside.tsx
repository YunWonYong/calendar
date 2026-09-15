import CreateGroupButton from "@/components/group/CreateGroupButton";

import LobbyAsideHeader from "./header/LobbyAsideHeader";
import LobbyAsideFooter from "./footer/LobbyAsideFooter";

import styles from "./LobbyAside.module.css";

import type { LobbyAsideProps } from "../LobbyTypes";

const LobbyAside = ({ asideState, toggleAsideState }: LobbyAsideProps) => {
    return (
        <nav
            className={ styles.nav }
            data-display-type={ asideState }
        >
            <LobbyAsideHeader 
                asideState={ asideState }
                toggleAsideState={ toggleAsideState }
            />
            <div className={styles.groupSection}>
                <div className={styles.actionWrap}>
                    <CreateGroupButton 
                        showLabel={ asideState === "expanded" }
                        className={styles.asideCreateBtn}
                    />
                </div>

                <ul className={styles.groupList}>
                </ul>
            </div>
            <LobbyAsideFooter
                asideState={ asideState }
            />
        </nav>
    );
};

export default LobbyAside;