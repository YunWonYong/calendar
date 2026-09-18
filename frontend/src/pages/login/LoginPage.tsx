import Link from "@/components/link";
import LogoImage from "@/components/LogoImage";
import { AUTH_PROVIDERS } from "@/domains/auth/authConstants";

import { LoginButton } from "./components/LoginButton";

import styles from "./LoginPage.module.css";

const LoginPage = () => {
    return (
        <section
            className={ styles.loginSection }
        >
            <article
                className={ styles.loginArticle }
            >
                <header
                    className={ styles.loginHeader }
                >
                    <div>
                        <Link
                            to="/"
                        >
                            <LogoImage 
                                className={ styles.loginLogo }
                            />
                        </Link>
                    </div>
                    <h1
                        className={ styles.loginHeaderText }
                    >
                        아워캘
                    </h1>
                </header>
                <div
                    className={ styles.loginButtonBox }
                >
                    {
                        AUTH_PROVIDERS.map(authProvider => {
                            return (
                                <LoginButton
                                    key={ `login-button-${ authProvider }` }
                                    authProvider={ authProvider }
                                />
                            );
                        })
                    }
                </div>
            </article>
        </section>
    );
};

export default LoginPage;