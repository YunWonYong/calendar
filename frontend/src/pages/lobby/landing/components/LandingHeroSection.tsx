import LandingHeroCalendarPreview from "./LandingHeroCalendarPreView";

import styles from "./LandingHeroSection.module.css";

const LandingHeroSection = () => {
    return (
        <section
            className={ styles.hero }
        >
            <div className={ styles.heroContent }>
                <span className={ styles.eyebrow }>
                    OUR CALENDAR
                </span>

                <h1 className={ styles.heroTitle }>
                    함께하는 하루를,
                    <br />
                    하나의 캘린더에.
                </h1>

                <p className={styles.heroDescription}>
                    일정부터 미션, 가계부, 인증까지
                    <br />
                    우리 그룹의 계획과 기록을 한곳에서 관리하세요.
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
            </div>
            <div className={styles.heroVisual}>
                <LandingHeroCalendarPreview />
                {/* <CalendarPreview /> */}
            </div>
        </section>
    );
};


// const CalendarPreview: FC = () => {
//     const dates = Array.from({ length: 35 }, (_, index) => index + 1);
//     return (
//         <div className={styles.calendarPreview}>
//             <div className={styles.previewTop}>
//                 <div>
//                     <span className={styles.previewYear}>
//                         2026
//                     </span>

//                     <strong className={styles.previewMonth}>
//                         9월
//                     </strong>
//                 </div>

//                 <span className={styles.previewGroup}>
//                     우리 그룹
//                 </span>
//             </div>

//             <div className={styles.weekdays}>
//                 {["일", "월", "화", "수", "목", "금", "토"].map(
//                     (day) => (
//                         <span key={day}>
//                             {day}
//                         </span>
//                     ),
//                 )}
//             </div>

//             <div className={styles.calendarGrid}>
//                 {dates.map((date) => (
//                     <div
//                         key={date}
//                         className={
//                             date === 15
//                                 ? styles.selectedDate
//                                 : styles.calendarDate
//                         }
//                     >
//                         {date <= 30 ? date : ""}
//                     </div>
//                 ))}
//             </div>

//             <div className={styles.previewEvents}>
//                 <div className={styles.event}>
//                     <span className={styles.eventDot} />
//                     저녁 모임
//                 </div>

//                 <div className={styles.event}>
//                     <span className={styles.missionDot} />
//                     운동 미션
//                 </div>
//             </div>
//         </div>
//     );
// };

export default LandingHeroSection;