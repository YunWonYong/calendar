import { FC } from "react";

import styles from "./CalendarHeader.module.css";

import type { CalendarHeaderProps } from "@/domains/calendar/calendarLayout";

const CalendarHeader: FC<CalendarHeaderProps> = ({ info, isActive, handles }) => {
    const { current, previous, next } = info;
    return (
        <header
            className={ styles.calendarHeader }
        >
            <div
                className={ styles.yearBox }
            >
                <span
                    className={ styles.yearText }
                    data-is-active={ isActive? "active": "inactive" }
                >
                    {
                        current.yearText
                    }
                </span>
            </div>
            <div
                className={ styles.monthWrap }
            >
                <div
                    className={ styles.monthBox }
                    data-is-active={ isActive? "active": "inactive" }
                >
                    {
                        previous.monthText
                    }
                </div>
                <div
                    className={ `${styles.monthBox} ${styles.current}` }
                >
                    {
                        current.monthText
                    }
                </div>
                <div
                    className={ styles.monthBox }
                    data-is-active={ isActive? "active": "inactive" }
                >
                    {
                        next.monthText
                    }
                </div>
            </div>
        </header>
    );
};

export default CalendarHeader;