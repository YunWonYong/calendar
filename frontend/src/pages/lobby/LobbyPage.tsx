import { useCallback, useState } from "react";

import { trackClickAndPreventDefault } from "@/analytics/button";

import EmptyGroupPage from "../group/lobby/EmptyGroupPage";
import GroupEmblemTestPage from "../group/test/GroupEmblemTestPage";

import LobbyAside from "./aside/LobbyAside";

import styles from "./LobbyPage.module.css";

import type { LobbyAsideState } from "./LobbyTypes";

const LobbyPage = () => {
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
                <GroupEmblemTestPage />
                {/* <CalendarPage /> */}
                <EmptyGroupPage />
            </section>
        </div>
    );
};

export default LobbyPage;