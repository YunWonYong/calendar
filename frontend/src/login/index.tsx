import { LoginButton } from "./LoginButton";

const LoginPage = () => {

    return (
        <section>
            <article>
                <LoginButton 
                    loginType="google"
                    title="Google Login"
                />
                <LoginButton 
                    loginType="kakao"
                    title="Kakao Login"
                />
                <LoginButton 
                    loginType="naver"
                    title="Naver Login"
                />
            </article>
        </section>
    );
};

export default LoginPage;