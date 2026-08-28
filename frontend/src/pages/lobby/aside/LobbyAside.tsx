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
            <ul
                className={ styles.groupList }
            >
                <li>
                    group item
                </li>
            </ul>
            <LobbyAsideFooter
                asideState={ asideState }
            />
        </nav>
    );
};

export default LobbyAside;