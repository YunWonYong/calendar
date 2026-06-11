import logoImage from "@/assets/login/logo.png";

import styles from "./LoginPage.module.css";

import { AUTH_PROVIDERS } from "@/domains/auth/authConstants";

import { LoginButton } from "./components/LoginButton";


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
                        <a
                            href="/"
                        >
                            <img 
                                className={ styles.loginLogo }
                                src={ logoImage }
                                alt="login page logo image"
                            />
                        </a>
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