import Link from "@/components/link";

import styles from "./LobbyAsideHeaderLoginButton.module.css";

import type { LobbyAsideState } from "../../LobbyTypes";

const LobbyAsideHeaderLoginButton = ({ asideState }: { asideState: LobbyAsideState; }) => {
    return (
        <div
            className={ styles.buttonBox }
        >
            <Link
                className={ styles.loginButton }
                to="/login"
            >
                로그인
            </Link>
        </div>
    );
};

export default LobbyAsideHeaderLoginButton;