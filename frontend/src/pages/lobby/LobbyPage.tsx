import { useCallback, useState } from "react";

import { trackClickAndPreventDefault } from "@/analytics/button";
import useAuth from "@/hooks/auth/useAuth";

import LobbyAside from "./aside/LobbyAside";
import LandingPage from "./landing/LandingPage";

import CalendarPage from "../calendar/CalendarPage";

import styles from "./LobbyPage.module.css";

import type { LobbyAsideState } from "./LobbyTypes";

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
                        ?   <CalendarPage />
                        :   <LandingPage />
                }
                
            </section>
        </div>
    );
};

export default LobbyPage;