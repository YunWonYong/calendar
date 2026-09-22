import type { LocaleType } from "../locale/locale";

import type { CalendarContextMonths } from "./calendarContext";
import type { CalendarDate, CalendarMonth } from "./calendarType";

export const ActionTypes = {
    CHANGE_LOCALE: "CHANGE_LOCALE",
    PREV_MONTH: "PREV_MONTH",
    NEXT_MONTH: "NEXT_MONTH",
    SELECT_DATE: "SELECT_DATE",
    JUMP_MONTH: "JUMP_MONTH",
} as const;

export type ActionType = typeof ActionTypes[keyof typeof ActionTypes];

export type Action = { type: typeof ActionTypes.CHANGE_LOCALE; payload: LocaleType; } | 
    { type: typeof ActionTypes.PREV_MONTH } | 
    { type: typeof ActionTypes.NEXT_MONTH } | 
    { type: typeof ActionTypes.SELECT_DATE; payload: CalendarDate } | 
    { type: typeof ActionTypes.JUMP_MONTH; payload: CalendarMonth };

export type State = {
    locale: LocaleType;
    weekdayTexts: string[];
    info: CalendarContextMonths;
    selectedDate: CalendarDate | null;
};