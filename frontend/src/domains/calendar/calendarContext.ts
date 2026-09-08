import { Month_1_To_12 } from "../lib/date";
import type { CalendarCurrentDate, CalendarDate, CalendarMonth } from "./calendarType";

export type CalendarSelectDateHandleType = (date: CalendarDate) => void;

export type CalendarHandles = {
    previousMonth: () => void;
    nextMonth: () => void;
    jumpMonth: (date: CalendarMonth) => void;
    selectDate: CalendarSelectDateHandleType;
};

export type CalendarContextMonths = {
    previous: CalendarMonth;
    current: CalendarCurrentDate;
    next: CalendarMonth;
};

export const DEFAULT_CALENDAR_CONTEXT_MOTHS: CalendarContextMonths = {
    previous: {
        year: 0,
        yearText: "0", 
        month: 1 as Month_1_To_12,
        monthText: "1",
    },
    current: {
        year: 0,
        yearText: "0", 
        month: 1 as Month_1_To_12,
        monthText: "1",
        today: "",
        weeks: [],
    },
    next: {
        year: 0,
        yearText: "0", 
        month: 1 as Month_1_To_12,
        monthText: "1",
    },
};

export type CalendarContextType = {
    metadata: {
        weekdayTexts: string[];
    };
    info: CalendarContextMonths;
    selectedDate: CalendarDate | null;
    handles: CalendarHandles;
};