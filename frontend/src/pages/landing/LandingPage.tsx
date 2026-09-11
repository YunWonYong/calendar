import Link from "@/components/link";
import LogoImage from "@/components/LogoImage";
import { LANDING_PAGE_SECTION_IDS } from "@/domains/landing/landingPageType";
import useLandingPageSectionScroll from "@/hooks/landing/UseLandingPageSectionScroll";

import LandingHeroSection from "./components/LandingHeroSection";
import LandingProblemSection from "./components/LandingProblemSection";
import LandingFeatureSection from "./components/LandingFeatureSection";

import styles from "./LandingPage.module.css";

const SECTION_MIN_HIGHT = 765;

const LandingPage = () => {
    const { step, previousStep } = useLandingPageSectionScroll(SECTION_MIN_HIGHT);
    return (
        <section className={ styles.wrap }>
            <Header />
            <article>
                <LandingHeroSection
                    id={ LANDING_PAGE_SECTION_IDS.HERO }
                    isAnimationPlay={ step === 0 || previousStep === 0 }
                />
                <LandingProblemSection
                    id={ LANDING_PAGE_SECTION_IDS.PROBLEM }
                    isAnimationPlay={ step === 1 || previousStep === 1}
                />
                <LandingFeatureSection
                    id={ LANDING_PAGE_SECTION_IDS.FEATURE }
                    isAnimationPlay={ step === 2 || previousStep === 2}
                />
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