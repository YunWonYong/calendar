import type { CalendarContextMonths, CalendarHandles, CalendarSelectDateHandleType } from "./calendarContext";
import type { CalendarCurrentDate, CalendarDate, CalendarWeek } from "./calendarType";

export type CalendarInteractionType = 
        ({ isActive: true; handles: CalendarHandles; } | 
        { isActive: false; handles: null; });

export type CalendarHeaderProps = {
    info: CalendarContextMonths;
} & CalendarInteractionType;

export type CalendarBodyProps = {
    current: CalendarCurrentDate;
    isActive?: boolean;
    weekdayTexts: string[];
    selectDateHandle: CalendarSelectDateHandleType | null;
};

export type WeekProps = {
    today: string;
    week: CalendarWeek;
    isActive?: boolean;
    selectDateHandle: CalendarSelectDateHandleType | null;
};

export type DateProps = {
    isToday: boolean;
    date: CalendarDate;
    isActive?: boolean;
    selectDateHandle: CalendarSelectDateHandleType | null;
};

export type DayProps = {
    text: string;
    weekdayIndex: number;
    isToday?: boolean;
    className?: string;
};