
import LogoImage from "@/components/LogoImage";
import LandingHeroCalendarPreview from "./LandingHeroCalendarPreView";
import styles from "./LandingHeroSection.module.css";
import Link from "@/components/link";

const LandingHeroSection = () => {
    return (
        <section
            className={ styles.wrap }
        >
            <div className={ styles.innerBox }>
                <div
                    className={ styles.logoBox }
                >
                    <LogoImage
                        className={ styles.logoImage }
                    />
                    <span className={ styles.brandBox }>
                        <span className={ styles.brandText1 }>
                            OUR 
                        </span>
                        <span className={ styles.brandText2 }>
                            CALENDAR
                        </span>
                    </span>
                </div>
                <div
                    className={ styles.sub }
                >
                    <p className={ styles.subTitle }>
                        우리들의 계획적인 하루를 위해! 
                    </p>
                    <p className={styles.subDescription}>
                        일정부터 미션, 가계부, 인증까지
                        <br />
                        우리 그룹의 계획과 기록을 한곳에서 관리하세요.
                    </p>
                </div>

                <Link
                    to={ "/login" }
                    className={ styles.primaryButton }
                >
                    <span
                        className={ styles.primaryButtonText }
                    >
                        아워캘 시작하기
                        <span aria-hidden="true">
                            →
                        </span>
                    </span>
                </Link>
            </div>
            <div className={styles.heroVisual}>
                <LandingHeroCalendarPreview />
                {/* <CalendarPreview /> */}
            </div>
        </section>
    );
};

export default LandingHeroSection;