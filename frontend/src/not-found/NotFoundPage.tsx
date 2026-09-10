
import LogoImage from "@/components/LogoImage";
import Link from "@/components/link";

import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
    return (
        <main className={styles.page}>
            <div className={styles.content}>
                <Link
                    to="/"
                    className={styles.logo}
                    aria-label="아워캘 홈으로 이동"
                >
                    <LogoImage />
                </Link>

                <div className={styles.errorCode}>
                    404
                </div>

                <h1 className={styles.title}>
                    페이지를 찾을 수 없어요.
                </h1>

                <p className={styles.description}>
                    요청하신 페이지가 존재하지 않거나
                    <br />
                    주소가 잘못되었어요.
                </p>

                <Link
                    to="/"
                    className={styles.homeButton}
                >
                    홈으로 돌아가기
                </Link>
            </div>
        </main>
    );
};

export default NotFoundPage;