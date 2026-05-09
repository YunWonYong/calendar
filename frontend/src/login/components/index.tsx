import { LoginButton } from "./LoginButton";

import logoImage from "@/assets/login/logo.png";

import styles from "../css/login.module.css";

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
                    <LoginButton
                        loginType="google"
                        title="Google Login"
                        styles={ styles }
                    />
                    <LoginButton
                        loginType="kakao"
                        title="Kakao Login"
                        styles={ styles }
                    />
                    <LoginButton
                        loginType="naver"
                        title="Naver Login"
                        styles={ styles }
                    />
                </div>
            </article>
        </section>
    );
};

export default LoginPage;