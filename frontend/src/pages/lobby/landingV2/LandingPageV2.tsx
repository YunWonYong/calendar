import Link from "@/components/link";
import LandingHeroSection from "../landing/components/LandingHeroSection";
import LogoImage from "@/components/LogoImage";

import styles from "./LandingPageV2.module.css";

const LandingPageV2 = () => {
    return (
        <section className={ styles.wrap }>
            <Header />
            <LandingHeroSection />
        </section>
    );
};

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* 좌측 로고 */}
        <Link to="/" className={styles.logoLink}>
          <LogoImage className={styles.logoImage} />
          <span className={styles.brandName}>Our Calendar</span>
        </Link>

        {/* 우측 액션 버튼 */}
        <div className={styles.navActions}>
          <Link to="/login" className={styles.loginBtn}>
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingPageV2;