import type { CalendarContextMonths } from "./calendarContext";
import type { CalendarDate, CalendarMonth } from "./calendarType";

export const ActionTypes = {
    INIT_CALENDAR: "INIT_CALENDAR",
    PREV_MONTH: "PREV_MONTH",
    NEXT_MONTH: "NEXT_MONTH",
    SELECT_DATE: "SELECT_DATE",
    JUMP_MONTH: "JUMP_MONTH",
} as const;

export type ActionType = typeof ActionTypes[keyof typeof ActionTypes];

export type Action = 
    {
        type: ActionType; 
    } |
    {
        type: Extract<ActionType, "INIT_CALENDAR">;
        payload: CalendarContextMonths,
    } |
    {
        type: Extract<ActionType, "JUMP_MONTH">;
        payload: CalendarMonth;
    } |
    {
        type: Extract<ActionType, "SELECT_DATE">;
        payload: CalendarDate;
    };

export type State = {
    hasInit: boolean;
    months: CalendarContextMonths;
};