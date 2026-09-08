import { FC } from "react";

import CalendarHeader from "../layout/CalendarHeader";
import CalendarBody from "../layout/CalendarBody";

import styles from "./CalendarViewer.module.css";

import type { CalendarContextMonths } from "@/domains/calendar/calendarContext";
import type { CalendarDate } from "@/domains/calendar/calendarType";
import type { CalendarInteractionType } from "@/domains/calendar/calendarLayout";

type CalendarViewerProps = {
    info: CalendarContextMonths;
    selectedDate: CalendarDate | null;
    weekdayTexts: string[];
} & CalendarInteractionType;

const CalendarViewer: FC<CalendarViewerProps> = (props) => {
    const { info } = props;
    const { current } = info;

    return (
        <div className={ styles.wrap }>
            <CalendarHeader
                { ...props }
            />

            <CalendarBody
                current={ current }
                weekdayTexts={ props.weekdayTexts }
                isActive={ props.isActive }
                selectDateHandle={ props.handles? props.handles.selectDate: null }
            />
        </div>
    );
};
export default CalendarViewer;