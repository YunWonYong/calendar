import LobbyAsideThemeToggleButton from "./LobbyAsideThemeToggleButton";

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
                <div>
                    사용자 프로필
                </div>
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