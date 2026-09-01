import Link from "@/components/link";

import useAuth from "@/hooks/auth/useAuth";

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

export const LobbyAsideHeaderDummyLoginButton = ({ asideState }: { asideState: LobbyAsideState; }) => {
    const { dummyLogin } = useAuth();
    return (
        <div
            className={ styles.buttonBox }
        >
            <span
                className={ styles.loginButton }
                onClick={ dummyLogin }
            >
                로그인
            </span>
        </div>
    );
};

export default LobbyAsideHeaderLoginButton;