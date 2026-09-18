import styles from "./AutoLoginOverlay.module.css";

const AutoLoginOverlay = () => {
    return (
        <div
            className={styles.overlay}
            role="status"
            aria-live="polite"
        >
            <div className={styles.content}>
                <div className={styles.spinner} />
                <span className={styles.message}>
                    자동 로그인 중...
                </span>
            </div>
        </div>
    );
};

export default AutoLoginOverlay;