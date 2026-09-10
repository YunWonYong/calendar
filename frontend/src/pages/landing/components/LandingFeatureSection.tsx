import styles from "./LandingFeatureSection.module.css";

const LandingFeatureSection = () => {
    return (
        <section className={styles.features} data-active="true">
            <div className={styles.featuresHeading}>
                <span className={styles.featuresLabel}>
                    WHAT OUR CALENDAR DOES
                </span>

                <h2>
                    함께 계획하고,
                    <br />
                    함께 기록하고,
                    <br />
                    함께 보상받아요.
                </h2>

                <p>
                    일정부터 가계부, 미션과 보상까지
                    <br />
                    그룹의 활동을 하나의 캘린더에서 관리할 수 있어요.
                </p>
            </div>

            <div className={styles.featureList}>
                <article className={styles.featureCard}>
                    <div className={styles.featureCardContent}>
                        <span className={styles.featureNumber}>
                            01
                        </span>

                        <h3>
                            함께하는 일정
                        </h3>

                        <p>
                            그룹의 약속과 일정을 공유하고
                            <br />
                            모두가 같은 계획을 확인할 수 있어요.
                        </p>
                    </div>

                    <div className={styles.featureVisual}>
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
                        </div>
                    </div>
                </article>

                <article className={styles.featureCard}>
                    <div className={styles.featureCardContent}>
                        <span className={styles.featureNumber}>
                            02
                        </span>

                        <h3>
                            함께 쓰는 가계부
                        </h3>

                        <p>
                            그룹에서 발생한 수입과 지출을 기록하고
                            <br />
                            누가 무엇을 사용했는지 한눈에 확인해요.
                        </p>
                    </div>

                    <div className={styles.featureVisual}>
                        <div className={styles.transactionPreview}>
                            <div>
                                <span>공동 식비</span>
                                <strong>- 32,000P</strong>
                            </div>

                            <div>
                                <span>그룹 포인트</span>
                                <strong>+ 10,000P</strong>
                            </div>
                        </div>
                    </div>
                </article>

                <article className={styles.featureCard}>
                    <div className={styles.featureCardContent}>
                        <span className={styles.featureNumber}>
                            03
                        </span>

                        <h3>
                            함께하는 미션
                        </h3>

                        <p>
                            그룹의 목표를 미션으로 만들고
                            <br />
                            완료한 사람에게 보상을 지급할 수 있어요.
                        </p>
                    </div>

                    <div className={styles.featureVisual}>
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
                        </div>
                    </div>
                </article>
            </div>

            <div className={styles.featuresResult}>
                <span>
                    일정, 기록, 미션 그리고 보상
                </span>

                <strong>
                    모두 우리의 캘린더 안에서.
                </strong>
            </div>
        </section>
    );
};

export default LandingFeatureSection;