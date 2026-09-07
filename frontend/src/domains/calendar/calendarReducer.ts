import type { CalendarContextMonths } from "./calendarContext";
import type { CalendarLocaleType } from "./calendarLocale";
import type { CalendarDate, CalendarMonth } from "./calendarType";

export const ActionTypes = {
    INIT_CALENDAR: "INIT_CALENDAR",
    PREV_MONTH: "PREV_MONTH",
    NEXT_MONTH: "NEXT_MONTH",
    SELECT_DATE: "SELECT_DATE",
    JUMP_MONTH: "JUMP_MONTH",
} as const;

export type ActionType = typeof ActionTypes[keyof typeof ActionTypes];

export type Action = { type: typeof ActionTypes.INIT_CALENDAR; payload: CalendarLocaleType } | 
    { type: typeof ActionTypes.PREV_MONTH } | 
    { type: typeof ActionTypes.NEXT_MONTH } | 
    { type: typeof ActionTypes.SELECT_DATE; payload: CalendarDate } | 
    { type: typeof ActionTypes.JUMP_MONTH; payload: CalendarMonth };

export type UninitializedState = {
    isInitialized: false;
    locale: null;
    months: null;
    selectedDate: null;
};

// 2. 초기화 후 상태
export type InitializedState = {
    isInitialized: true;
    locale: CalendarLocaleType;
    months: CalendarContextMonths;
    selectedDate: CalendarDate | null;
};

export type State = UninitializedState | InitializedState;