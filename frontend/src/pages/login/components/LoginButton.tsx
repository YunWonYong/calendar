import { FC } from "react";

import config from "@/config";

import styles from "./LoginButton.module.css";

import type { AuthProvider } from "@/domains/auth/authTypes";

type LoginButtonProps = { 
    authProvider: AuthProvider;
    title?: string;
};

export const LoginButton: FC<LoginButtonProps> = ({ authProvider, title }) => {
    return (
        <a
            href={ `${config.apiServerURL}/oauth2/authorization/${authProvider}` }
            className={ styles.loginButtonLink }
        >
            <span
                className={ styles.loginButtonIcon }
                data-auth-provider={ authProvider }
            >
            </span>
            <div
                className={ styles.loginButton }
            >
                {
                    title
                }
            </div>
        </a>
    );
};
