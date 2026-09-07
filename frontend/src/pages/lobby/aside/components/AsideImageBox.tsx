import type { FC, ReactNode } from "react";
import type { LobbyAsideState } from "../../LobbyTypes";

import styles from "./AsideImageBox.module.css";

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