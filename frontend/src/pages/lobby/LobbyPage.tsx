import { useCallback, useState } from "react";
import { trackClickAndPreventDefault } from "@/analytics/button";

import LobbyAside from "./aside/LobbyAside";

import styles from "./LobbyPage.module.css";
import type { LobbyAsideState } from "./LobbyTypes";
import Calendar from "../calendar/Calendar";
import useAuth from "@/hooks/auth/useAuth";
import LandingPage from "./landing/LandingPage";

const LobbyPage = () => {
    const { isLogin } = useAuth();
    const [ asideState, setAsideState ] = useState<LobbyAsideState>("collapsed");
    const toggleAsideState = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        trackClickAndPreventDefault(
            event,
            `LOBBY-ASIDE-${asideState.toUpperCase()}`,
            () => {
                setAsideState((prev: LobbyAsideState) => {
                    return prev === "collapsed"? "expanded": "collapsed";
                });
            },
        );
    }, [asideState]);
    return (
        <div
            className={ styles.lobbyWrap }
            data-display-type={ asideState }
        >
            <div
                className={ styles.lobbyAsideLayout }
            >
                <LobbyAside 
                    asideState={ asideState }
                    toggleAsideState={ toggleAsideState }
                />
            </div>

            <section
                className={ styles.lobbySection }
            >
                {
                    isLogin
                        ?   <Calendar />
                        :   <LandingPage />
                }
                
            </section>
        </div>
    );
};

export default LobbyPage;