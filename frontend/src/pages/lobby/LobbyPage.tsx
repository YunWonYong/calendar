import { useCallback, useState } from "react";
import { trackClickAndPreventDefault } from "@/analytics/button";

import LobbyAside from "./aside/LobbyAside";

import styles from "./LobbyPage.module.css";
import type { LobbyAsideState } from "./LobbyTypes";

const LobbyPage = () => {
    const [ asideState, setAsideState ] = useState<LobbyAsideState>("expanded");
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

    // [TODO] authCode로 user 데이터 조회하기.
    return (
        <div
            className={ styles.lobbyWrap }
        >
            <LobbyAside 
                asideState={ asideState }
                toggleAsideState={ toggleAsideState }
            />

            <section
                className={ styles.lobbySection }
            >
                main
            </section>
        </div>
    );
};

export default LobbyPage;