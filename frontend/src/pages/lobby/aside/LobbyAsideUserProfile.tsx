import Link from "@/components/link";
import logoImage from "@/assets/logo/logo.png";

import styles from "./LobbyAsideUserProfile.module.css";
import type { LobbyAsideState } from "../LobbyTypes";

const LobbyAsideUserProfile = ({ asideState }: { asideState: LobbyAsideState; }) => {
    return (
        <div
            className={ styles.wrap }
        >
            <div
                className={ styles.logoBox }
            >
                <Link
                    className={ styles.logoLink }
                    to="/"
                >
                    <img 
                        className={ styles.logo }
                        src={ logoImage }
                        alt="아워캘 로고"
                    />
                    <h1
                        className={ styles.logoText }
                    >
                        아워캘
                    </h1>
                </Link>
            </div>
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
        </div>
    );
};

export default LobbyAsideUserProfile;