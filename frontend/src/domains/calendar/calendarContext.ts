import type { CalendarCurrentDate, CalendarDate, CalendarMonth } from "./calendarType";

export type CalendarHandles = {
    previousMonth: () => void;
    nextMonth: () => void;
    jumpMonth: (date: CalendarMonth) => void;
    selectDate: (date: CalendarDate) => void;
};

export type CalendarContextMonths = {
    previous: CalendarMonth;
    current: CalendarCurrentDate;
    next: CalendarMonth;
};

export type CalendarContextType = {
    months: CalendarContextMonths;
    selectedDate: CalendarDate | null;
    handles: CalendarHandles;
};