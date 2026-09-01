import Link from "@/components/link";
import logoImage from "@/assets/logo/logo.png";
import useAuth from "@/hooks/auth/useAuth";
import Image from "@/components/Image";

// import LobbyAsideHeaderLoginButton from "./LobbyAsideHeaderLoginButton";
import { LobbyAsideHeaderDummyLoginButton } from "./LobbyAsideHeaderLoginButton";

 import LobbyAsideUserProfile from "./LobbyAsideUserProfile";

import styles from "./LobbyAsideHeader.module.css";

import type { LobbyAsideProps } from "../../LobbyTypes";

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
                    // :   <LobbyAsideHeaderLoginButton asideState={ asideState } />
                    :   <LobbyAsideHeaderDummyLoginButton asideState={ asideState } />
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
                data-display-type={ asideState }
            >
                <Link
                    className={ styles.logoLink }
                    to="/"
                >
                    {
                        asideState === "expanded" &&
                            <span
                                className={ styles.logoText }
                            >
                                아워캘
                            </span>
                    }
                    <Image
                        className={ styles.logo }
                        src={ logoImage }
                        alt="아워캘 로고"
                        data-display-type={ asideState }
                    />
                </Link>
            </div>
        </>
    );
};

export default LobbyAsideHeader;