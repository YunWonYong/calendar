import { FC } from "react";

import { trackClickAndPreventDefault } from "@/analytics/button";
import styles from "./CalendarBody.module.css";

import type { CalendarBodyProps, DateProps, DayProps, WeekProps } from "@/domains/calendar/calendarLayout";

const CalendarBody: FC<CalendarBodyProps> = (props) => {
    const { today, weeks, month, year } = props.current;
    return (
        <section
            className={ styles.calendarBody }
        >
            <header
                className={ styles.dayTextBox }
            >
                {
                    props.weekdayTexts.map((dayText, dayIndex) => {
                        return (
                            <div
                                key={ dayText }
                            >
                                <Day 
                                    className={ styles.date }
                                    text={ dayText }
                                    weekdayIndex={ dayIndex }
                                />
                            </div>
                        );
                    })
                }
            </header>
            {
                weeks.map((week) => {
                    return (
                        <Week 
                            key={ `${year}-${month}#${week.weekNo}` }
                            today={ today }
                            week={ week }
                            { ...props }
                        />
                    );
                })
            }
        </section>
    );
};

const Week: FC<WeekProps> = (props) => {
    const { dateList, weekNo } = props.week;
    return (
        <article
            className={ styles.weeks }
        >
            {
                dateList.map((date) => {
                    const currentDay = `${date.year}-${date.month}-${date.date}`;
                    return (
                        <Date
                            key={ `${currentDay}#${weekNo}` }
                            isToday={ currentDay === props.today }
                            date={ date }
                            { ...props }
                        />
                    );
                })
            }
        </article>
    );
};

const Date: FC<DateProps> = (props) => {
    const { isToday, date, selectDateHandle } = props;
    return (
        <div
            className={ `${styles.dateBox} ${date.isCurrentMonth? styles.current: ""}` }
            data-is-today={ isToday }
            data-is-active={ props.isActive }
            data-current-month={ date.isCurrentMonth }
            onClick={(event) => {
                if (props.isActive === true && selectDateHandle) {
                    trackClickAndPreventDefault(
                        event,
                        `CALENDAR-SELECT-DATE#${date.year}_${date.month}_${date.date}`,
                        () => selectDateHandle(date),
                    );
                }
            }}
        >
            <Day 
                className={ styles.date }
                text={ date.dateText }
                weekdayIndex={ date.dayIndex }
                isToday={ isToday }
            />
        </div>
    );
};

const Day: FC<DayProps> = ({ text, weekdayIndex, isToday, className }) => {
    return (
        <span
            className={ `${className || ""} ${styles.day}` }
            data-weekday-index={ weekdayIndex }
            data-is-today={ isToday }
        >
            {
                text
            }
        </span>
    );
};
export default CalendarBody;