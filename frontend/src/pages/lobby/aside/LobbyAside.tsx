import LobbyAsideThemeToggleButton from "./LobbyAsideThemeToggleButton";
import LobbyAsideUserProfile from "./LobbyAsideUserProfile";

import styles from "./LobbyAside.module.css";
import type { LobbyAsideProps } from "../LobbyTypes";

const LobbyAside = ({ asideState, toggleAsideState }: LobbyAsideProps) => {
    const isAsideCollapsed = asideState === "collapsed";
    return (
        <nav
            className={ styles.nav }
            data-display-type={ asideState }
        >
            <header
                className={ styles.header }
            >
                <div
                    className={ styles.collapsedWrap }
                >
                    <button
                        type="button"
                        className={ styles.collapsedBtn }
                        onClick={ toggleAsideState }
                    > 
                        {
                            isAsideCollapsed
                                ?   ">>"
                                :   "<<"
                        }
                    </button>
                </div>
                <LobbyAsideUserProfile 
                    asideState={ asideState }
                />
            </header>
            <ul
                className={ styles.groupList }
            >
                <li>
                    group item
                </li>
            </ul>
            <footer
                className={ styles.footer }
            >
                <LobbyAsideThemeToggleButton 
                    asideState={ asideState }
                />
            </footer>
        </nav>
    );
};

export default LobbyAside;