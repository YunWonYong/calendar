import { FC } from "react";

import config from "@/config";

export const LoginButton: FC<{ loginType: "google" | "kakao" | "naver", title?: string }> = ({ loginType, title }) => {
    return (
        <a
            href={ `${config.apiServerURL}/oauth2/authorization/${loginType}` }
        >
            {
                title
            }
        </a>
    );
};
