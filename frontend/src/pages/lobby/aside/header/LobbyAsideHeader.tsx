import Link from "@/components/link";
import logoImage from "@/assets/logo/logo.png";
import useAuth from "@/hooks/auth/useAuth";

import LobbyAsideHeaderLoginButton from "./LobbyAsideHeaderLoginButton";

import styles from "./LobbyAsideHeader.module.css";

import type { LobbyAsideProps } from "../../LobbyTypes";
import LobbyAsideUserProfile from "./LobbyAsideUserProfile";

const LobbyAsideHeader = ({ asideState, toggleAsideState }: LobbyAsideProps) => {
    const { isLogin } = useAuth();
    return (
        <header
            className={ styles.header }
        >
            <LogoAndCollapsedButton 
                asideState={ asideState }
                toggleAsideState={ toggleAsideState }
            />

            {
                isLogin
                    ?   <LobbyAsideUserProfile asideState={ asideState } />
                    :   <LobbyAsideHeaderLoginButton asideState={ asideState } />
            }
        </header>
    );
};

const LogoAndCollapsedButton = ({ asideState, toggleAsideState }: LobbyAsideProps) => {
    return (
        <>
            <div
                className={ styles.collapsedWrap }
            >
                <button
                    type="button"
                    className={ styles.collapsedBtn }
                    onClick={ toggleAsideState }
                > 
                    {
                        asideState === "collapsed"
                            ?   ">>"
                            :   "<<"
                    }
                </button>
            </div>

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
        </>
    );
};

export default LobbyAsideHeader;