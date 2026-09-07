import Link from "@/components/link";

import AsideImageBox from "../components/AsideImageBox";

import styles from "./LobbyAsideHeaderLoginButton.module.css";

import type { LobbyAsideState } from "../../LobbyTypes";

const LobbyAsideHeaderLoginButton = ({ asideState }: { asideState: LobbyAsideState; }) => {
    return (
        <AsideImageBox
            asideState={ asideState }
        >
            <Link
                className={ styles.loginButton }
                to="/login"
            >
                {
                    asideState === "expanded" &&
                        <span>
                            로그인
                        </span>
                }
                <LoginButtonSVG 
                    asideState={ asideState }
                />
            </Link>
        </AsideImageBox>
    );
};

const LoginButtonSVG = ({ asideState }: { asideState: LobbyAsideState }) => {
    return (
        <svg 
            xmlns="http://w3.org"
            className={ styles.loginButtonIcon }
            data-display-type={ asideState } 
            width="24" 
            height="24" 
            viewBox="0 0 24 24"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
        </svg>
    );
};
export default LobbyAsideHeaderLoginButton;