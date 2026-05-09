import { FC } from "react";

import config from "@/config";


type LoginButtonProps = { 
    loginType: "google" | "kakao" | "naver";
    title?: string;
    styles: Record<string, string>;
};

export const LoginButton: FC<LoginButtonProps> = ({ loginType, title, styles }) => {
    return (
        <a
            href={ `${config.apiServerURL}/oauth2/authorization/${loginType}` }
            className={ styles.loginButtonLink }
        >
            <span
                className={ styles.loginButtonIcon }
                data-login-type={ loginType }
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
