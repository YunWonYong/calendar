import { FC, ReactNode } from "react";

import styles from "./LandingFeatureArticle.module.css";

import type { LandingPageSectionProps } from "@/domains/landing/landingPageType";

// [TODO] locale
const scheduleVisual = 
    <div className={styles.schedulePreview}>
        <span className={styles.previewDate}>
            09.12
        </span>
        <strong>
            함께 저녁 먹기
        </strong>
        <span className={styles.previewTime}>
            19:00 · 우리 동네 식당
        </span>
    </div>;

const transactionVisual = 
    <div className={styles.transactionPreview}>
        <div>
            <span>공동 식비</span>
            <strong>- 32,000P</strong>
        </div>

        <div>
            <span>그룹 포인트</span>
            <strong>+ 10,000P</strong>
        </div>
    </div>; 

const missionVisual = 
    <div className={styles.missionPreview}>
        <div className={styles.missionTitle}>
            <span>✓</span>
            <strong>
                이번 주 운동 3회
            </strong>
        </div>

        <div className={styles.rewardList}>
            <span className={styles.pointReward}>
                + 500 Point
            </span>

            <span className={styles.ticketReward}>
                + 영화 티켓 × 1
            </span>
        </div>
    </div>;

type FeatureCardContent = {
    number: string;
    title: string;
    descriptions: string[];
};

type FeatureCard = {
    content: FeatureCardContent;
    visual: ReactNode;
};

const featureCards: FeatureCard[] = [
    {
        content: {
            number: "01",
            title: "함께하는 일정",
            descriptions: [
                "그룹의 약속과 일정을 공유하고",
                "모두가 같은 계획을 확인할 수 있어요."
            ]
        },
        visual: scheduleVisual,
    },
    {
        content: {
            number: "02",
            title: "함께 쓰는 가게부",
            descriptions: [
                "그룹에서 발생한 수입과 지출을 기록하고",
                "누가 무엇을 사용했는지 한눈에 확인해요."
            ]
        },
        visual: transactionVisual,
    }, 
    {
        content: {
            number: "03",
            title: "함께하는 미션",
            descriptions: [
                "그룹의 목표를 미션으로 만들고",
                "완료한 사람에게 보상을 지급할 수 있어요."
            ]
        },
        visual: missionVisual,
    }, 
];

const FeatureCardContent: FC<{ content: FeatureCardContent; }> = ({ content }) => {
    const { number, title, descriptions } = content;
    return (
        <div
            className={ styles.featureCardContent }
        >
            <span
                className={ styles.featureNumber }
            >
                {
                    number
                }
            </span>
            <h3>
                {
                    title
                }
            </h3>
            {
                descriptions.map((description, index) => {
                    return (
                        <p
                            key={ `${number}-${title}#${index}` }
                        >
                            {
                                description
                            }
                        </p>
                    );
                })
            }
        </div>
    )
};

const FeatureCard: FC<FeatureCard> = ({ content, visual }) => {
    return (
        <li
            className={ styles.featureCard }
        >
            <FeatureCardContent 
                content={ content }
            />
            {
                visual
            }
        </li>
    );
};

const FeatureCards = () => {
    return (
        <ul
            className={ styles.featureList }
        >
            {
                featureCards.map((featureCard, index) => {
                    return (
                        <FeatureCard 
                            key={ `landingPageFeatureCard#${index}` }
                            { ...featureCard }
                        />
                    );
                })
            }
        </ul>
    );
};

const FeatureHeader = () => {
    return (
        <div 
            className={ styles.header }
        >
            <span 
                className={ styles.featuresLabel }
            >
                WHAT OUR CALENDAR DOES
            </span>
            <div
                className={ styles.headerTitleBox }
            >
                <h2
                    className={ styles.headerTitle }
                >
                    함께하고 싶은 사람들과 그룹을 만들고
                </h2>
                <h2
                    className={ styles.headerTitle }
                >
                    계획과 기록에 재미를 추가해요.
                </h2>
            </div>
            <div
                className={ styles.headerDescriptionBox }
            >
                <p
                    className={ styles.headerDescription }
                >
                    일정부터 가계부, 미션과 보상까지
                </p>
                <p
                    className={ styles.headerDescription }
                >
                    그룹의 활동을 하나의 캘린더에서 관리할 수 있어요.
                </p>
            </div>
        </div>
    );
};

const FeatureFooter = () => {
    return (
        <div className={styles.featuresResult}>
            <span>
                일정, 기록, 미션 그리고 보상
            </span>

            <strong>
                모두 우리의 캘린더 안에서.
            </strong>
        </div>
    );
};

const LandingFeatureArticle: FC<LandingPageSectionProps> = ({ isAnimationPlay }) => {
    return (
        <article
            className={ styles.features }
            data-animation-play={ isAnimationPlay }
        >
            <FeatureHeader />
            <FeatureCards />
            <FeatureFooter />
        </article>
    );
};

export default LandingFeatureArticle;