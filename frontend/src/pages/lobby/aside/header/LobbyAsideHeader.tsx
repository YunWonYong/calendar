import Link from "@/components/link";
import LogoImage from "@/components/LogoImage";
import useAuth from "@/hooks/auth/useAuth";

import LobbyAsideHeaderLoginButton from "./LobbyAsideHeaderLoginButton";
import LobbyAsideUserProfile from "./LobbyAsideUserProfile";

import styles from "./LobbyAsideHeader.module.css";

import type { LobbyAsideProps, LobbyAsideState } from "../../LobbyTypes";

const LobbyAsideHeader = ({ asideState, toggleAsideState }: LobbyAsideProps) => {
    const { isLogin } = useAuth();
    return (
        <header
            className={ styles.header }
        >
            <AsideToggleButton 
                asideState={ asideState }
                toggleAsideState={ toggleAsideState }
            />
            <LogoBox 
                asideState={ asideState }
            />

            {
                isLogin
                    ?   <LobbyAsideUserProfile asideState={ asideState } />
                    :   <LobbyAsideHeaderLoginButton asideState={ asideState } />
            }
        </header>
    );
};

const LogoBox = ({ asideState }: { asideState: LobbyAsideState }) => {
    return (
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
                <LogoImage 
                    className={ styles.logo }
                    data-display-type={ asideState }
                />
            </Link>
        </div>
    );
};

const AsideToggleButton = ({ asideState, toggleAsideState }: LobbyAsideProps) => {
    return (
        <div className={ styles.toggleWrap }>
            <button
                type="button"
                className={ styles.toggleBtn }
                onClick={ toggleAsideState }
            >
                <AsideToggleButtonSVG
                    asideState={ asideState }
                />
            </button>
        </div>
    );
};


const AsideToggleButtonSVG = ({ asideState }: { asideState: LobbyAsideState }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className={ styles.toggleIcon }
        >
            <path 
                d="M51.10775 57.1385H8.89225c-3.33075 0 -6.03075 -2.7 -6.03075 -6.03075l0 -42.2155c0 -3.33075 2.7 -6.03075 6.03075 -6.03075h42.2155c3.33075 0 6.03075 2.7 6.03075 6.03075v42.2155c0 3.33075 -3.7 6.03075 -6.03075 6.03075Z" 
                fill="none"
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="4"
            />
            <path 
                d={
                    asideState === "collapsed"
                        ?   "M15.4 23.96925 20.677 30l-5.277 6.03075"
                        :   "M15.677 23.96925 10.4 30l5.277 6.03075"
                } 
                fill="none"
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="4"
            />
            <path 
                d={
                    asideState === "collapsed"
                        ?   "M32.4615 57.1385V2.8615"
                        :   "M22.4615 57.1385V2.8615"
                } 
                fill="none"
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="4"
            />
        </svg>
    );
};
export default LobbyAsideHeader;