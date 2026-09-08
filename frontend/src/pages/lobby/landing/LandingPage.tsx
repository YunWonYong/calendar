import type { FC } from "react";

import LogoImage from "@/components/LogoImage";

import styles from "./LandingPage.module.css";
import LandingHeroSection from "./components/LandingHeroSection";

type Feature = {
    title: string;
    description: string;
    icon: string;
};

const FEATURES: Feature[] = [
    {
        title: "공유 일정",
        description:
            "우리 그룹의 일정을 함께 확인하고 관리할 수 있어요.",
        icon: "calendar",
    },
    {
        title: "미션",
        description:
            "함께할 목표를 정하고 진행 상황을 기록해보세요.",
        icon: "mission",
    },
    {
        title: "가계부",
        description:
            "그룹에서 함께 사용한 비용을 간편하게 기록하세요.",
        icon: "money",
    },
    {
        title: "인증",
        description:
            "완료한 활동을 인증하고 우리의 기록으로 남겨보세요.",
        icon: "camera",
    },
];

type Step = {
    number: string;
    title: string;
    description: string;
};

const STEPS: Step[] = [
    {
        number: "01",
        title: "그룹을 만들어요",
        description:
            "함께하고 싶은 사람들과 그룹을 만들어보세요.",
    },
    {
        number: "02",
        title: "함께 계획해요",
        description:
            "일정과 미션을 등록하고 함께할 일을 정해보세요.",
    },
    {
        number: "03",
        title: "함께 기록해요",
        description:
            "가계부와 인증으로 우리의 활동을 기록해보세요.",
    },
];

const LandingPage: FC = () => {
    return (
        <article className={styles.page}>
            <LandingHeroSection />
            <section className={styles.problem}>
                <div className={styles.sectionHeading}>
                    <span className={styles.sectionLabel}>
                        WHY OUR CALENDAR
                    </span>

                    <h2>
                        함께하는 일은
                        <br />
                        생각보다 여러 곳에 흩어져 있어요.
                    </h2>

                    <p>
                        일정은 캘린더에,
                        <br />
                        이야기는 메신저에,
                        <br />
                        비용은 계산기에 흩어져 있지 않나요?
                    </p>
                </div>

                <div className={styles.problemFlow}>
                    <div className={styles.problemItem}>
                        <span>일정</span>
                        <strong>📅</strong>
                    </div>

                    <div className={styles.problemItem}>
                        <span>대화</span>
                        <strong>💬</strong>
                    </div>

                    <div className={styles.problemItem}>
                        <span>비용</span>
                        <strong>₩</strong>
                    </div>

                    <div className={styles.problemItem}>
                        <span>인증</span>
                        <strong>✓</strong>
                    </div>
                </div>

                <div className={styles.problemResult}>
                    <span>그래서</span>

                    <strong>
                        아워캘에서 한곳에
                    </strong>
                </div>
            </section>

            <section className={styles.features}>
                <div className={styles.sectionHeading}>
                    <span className={styles.sectionLabel}>
                        FEATURES
                    </span>

                    <h2>
                        우리끼리 필요한 기능을
                        <br />
                        한곳에 모았습니다.
                    </h2>
                </div>

                <div className={styles.featureGrid}>
                    {FEATURES.map((feature) => (
                        <article
                            key={feature.title}
                            className={styles.featureCard}
                        >
                            <div
                                className={`${styles.featureIcon} ${styles[`icon-${feature.icon}`]}`}
                            >
                                {feature.icon === "calendar" && "□"}
                                {feature.icon === "mission" && "★"}
                                {feature.icon === "money" && "₩"}
                                {feature.icon === "camera" && "○"}
                            </div>

                            <h3>
                                {feature.title}
                            </h3>

                            <p>
                                {feature.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.howItWorks}>
                <div className={styles.sectionHeading}>
                    <span className={styles.sectionLabel}>
                        HOW IT WORKS
                    </span>

                    <h2>
                        아워캘은 이렇게 사용해요.
                    </h2>
                </div>

                <div className={styles.stepList}>
                    {STEPS.map((step, index) => (
                        <article
                            key={step.number}
                            className={styles.step}
                        >
                            <span className={styles.stepNumber}>
                                {step.number}
                            </span>

                            <h3>
                                {step.title}
                            </h3>

                            <p>
                                {step.description}
                            </p>

                            {index < STEPS.length - 1 && (
                                <span
                                    className={styles.stepArrow}
                                    aria-hidden="true"
                                >
                                    →
                                </span>
                            )}
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.cta}>
                <LogoImage className={styles.ctaLogo} />

                <h2>
                    우리만의 캘린더를
                    <br />
                    시작해보세요.
                </h2>

                <p>
                    함께 계획하고, 함께 기록하는 새로운 방법.
                </p>

                <a
                    href="/login"
                    className={styles.primaryButton}
                >
                    아워캘 시작하기
                    <span aria-hidden="true">
                        →
                    </span>
                </a>
            </section>

            <footer className={styles.footer}>
                <span>
                    © our calendar
                </span>
            </footer>
        </article>
    );
};

export default LandingPage;