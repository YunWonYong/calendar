import { FC } from "react";

import CalendarHeader from "../layout/CalendarHeader";
import CalendarBody from "../layout/CalendarBody";

import styles from "./CalendarViewer.module.css";

import type { CalendarDate, CalendarEventCounts } from "@/domains/calendar/calendarType";
import type { CalendarInteractionType } from "@/domains/calendar/calendarLayout";
import type { CalendarContextMonths } from "@/domains/calendar/calendarContext";

type CalendarViewerProps = {
    info: CalendarContextMonths;
    selectedDate: CalendarDate | null;
    weekdayTexts: string[];
    eventCounts: CalendarEventCounts;
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
                eventCounts={ props.eventCounts }
            />
        </div>
    );
};
export default CalendarViewer;