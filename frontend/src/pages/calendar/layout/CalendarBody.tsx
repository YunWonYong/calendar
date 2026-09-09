import { FC } from "react";

import { CalendarEventMainTypes } from "@/domains/calendar/calendarType";
import { trackClickAndPreventDefault } from "@/analytics/button";

import styles from "./CalendarBody.module.css";

import type { CalendarBodyProps, DateProps, DayProps, WeekProps } from "@/domains/calendar/calendarLayout";
import type { CalendarEventCount, CalendarEventMainType } from "@/domains/calendar/calendarType";

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
                                    className={ styles.header }
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
                            eventCount={ props.eventCounts[currentDay] }
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
    const ymd = `${date.year}_${date.month}_${date.date}`;
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
                        `CALENDAR-SELECT-DATE@${ymd}`,
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

            {
                props.eventCount &&
                    <DayEventDotBox
                        ymd={ ymd }
                        eventCount={ props.eventCount }
                    />
            }
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

const orderedTypes: CalendarEventMainType[] = [
    CalendarEventMainTypes.SCHEDULE,
    CalendarEventMainTypes.TRANSACTION,
    CalendarEventMainTypes.MISSION,
];
const DayEventDotBox: FC<{ ymd: string; eventCount: CalendarEventCount }> = ({ ymd, eventCount }) => {
    // const displayEvents = events.slice(0, 3);

    return (
        <div 
            className={ styles.dotWrap }
        >
            {
                orderedTypes.map((eventType) => {
                    const count = eventCount[eventType];
                    return (
                        <div 
                            className={ `${styles.dotBox} ${count === 0? styles.hidden: ""}` }
                            key={ `${ymd}#${eventType}@${count}` }
                        >
                            <span
                                className={ `${styles.dot} ${count === 0? styles.hidden: ""}` }
                                data-event-type={ eventType }
                            >
                            </span>
                            <span
                                className={ styles.eventCount }
                            >
                                {
                                    count > 99
                                        ? "99..."
                                        : count
                                        
                                }
                            </span>
                        </div>
                    );
                })
            }
        </div>
    );
};
export default CalendarBody;