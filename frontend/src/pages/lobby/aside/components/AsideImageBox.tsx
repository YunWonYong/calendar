import type { FC, ReactNode } from "react";

import styles from "./AsideImageBox.module.css";

import type { LobbyAsideState } from "../../LobbyTypes";

const AsideImageBox: FC<{ children: ReactNode; asideState: LobbyAsideState; }> = ({ asideState, children }) => {
    return (
        <div
            className={ styles.box }
            data-display-type={ asideState }
        >
            {
                children
            }
        </div>
    );
};

export default AsideImageBox;