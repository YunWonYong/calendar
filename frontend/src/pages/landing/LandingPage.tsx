import Link from "@/components/link";
import LogoImage from "@/components/LogoImage";

import LandingHeroSection from "./components/LandingHeroSection";
import LandingProblemSection from "./components/LandingProblemSection";
import LandingFeatureSection from "./components/LandingFeatureSection";

import styles from "./LandingPage.module.css";

const LandingPage = () => {
    return (
        <section className={ styles.wrap }>
            <Header />
            <article>
                <LandingHeroSection />
                <LandingProblemSection />
                <LandingFeatureSection />
            </article>
        </section>
    );
};

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link 
                    to="/" 
                    className={styles.logoLink}
                    clickEventName="LOBBY_HEADER_LOGO"
                >
                    <LogoImage 
                        className={styles.logoImage} 
                    />
                    <span className={styles.brandName}>Our Calendar</span>
                </Link>
                <div className={styles.navActions}>
                    <Link 
                        to="/login" 
                        className={styles.loginBtn}
                        clickEventName="LOBBY_HEADER_LOGIN_BTN"
                    >
                        로그인
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default LandingPage;