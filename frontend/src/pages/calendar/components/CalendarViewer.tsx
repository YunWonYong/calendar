import { FC } from "react";

import CalendarBody from "../layout/CalendarBody";
import CalendarHeader from "../layout/CalendarHeader";

import styles from "./CalendarViewer.module.css";

import type { CalendarContextMonths } from "@/domains/calendar/calendarContext";
import type { CalendarInteractionType } from "@/domains/calendar/calendarLayout";
import type { CalendarDate, CalendarEventCounts } from "@/domains/calendar/calendarType";

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