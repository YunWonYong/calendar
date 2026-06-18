import { FC } from "react";

import { getLoginPath } from "@/server/api";

import styles from "./LoginButton.module.css";

import type { AuthProvider } from "@/domains/auth/authTypes";

type LoginButtonProps = { 
    authProvider: AuthProvider;
    title?: string;
};

export const LoginButton: FC<LoginButtonProps> = ({ authProvider, title }) => {
    return (
        <a
            href={ getLoginPath(authProvider) }
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
