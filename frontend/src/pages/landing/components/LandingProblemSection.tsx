
import styles from "./LandingProblemSection.module.css";

const LandingProblemSection = () => {
    return (
        <section className={styles.problem}>
            <div className={styles.problemHeading}>
                <span className={styles.problemLabel}>
                    WHY OUR CALENDAR
                </span>

                <h2>
                    함께하는 생활은
                    <br />
                    하나의 캘린더만으로는 부족하니까요.
                </h2>

                <p>
                    약속과 일정은 캘린더에,
                    <br />
                    함께 쓴 돈은 가계부에,
                    <br />
                    함께할 일은 미션으로 따로 관리하고 있지 않나요?
                </p>
            </div>
            <div className={styles.problemFlow}>
                <div className={styles.problemItem}>
                    <span>일정</span>
                    <strong>📅</strong>
                </div>

                <div className={styles.problemItem}>
                    <span>가계부</span>
                    <strong>₩</strong>
                </div>

                <div className={styles.problemItem}>
                    <span>미션</span>
                    <strong>✓</strong>
                </div>
            </div>

            <div className={styles.problemResult}>
                <span>아워캘은</span>

                <strong>
                    함께하는 계획과 기록을 한곳에 모아요.
                </strong>
            </div>
        </section>
    );
};

export default LandingProblemSection;