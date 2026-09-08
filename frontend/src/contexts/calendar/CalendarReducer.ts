import { getCalendarMonths, getCalendarWeekdayTexts, getCurrentCalendarMonths, jumpMonth, nextMonth, previousMonth } from "@/lib/calendar/calendar";
import { ActionTypes } from "@/domains/calendar/calendarReducer";

import type { Action, State } from "@/domains/calendar/calendarReducer";
import type { CalendarLocaleType } from "@/domains/calendar/calendarLocale";

// type AssertInitialized = (state: State, type: ActionType) => asserts state is InitializedState;

// const assertInitialized: AssertInitialized = (state: State, type: ActionType) => {
//     if (!state.isInitialized && type !== ActionTypes.INIT_CALENDAR) {
//         throw new Error("Calendar state is not initialized.");
//     }
// }

export const initCalendarState = (locale: CalendarLocaleType) => {
    const weekdayTexts = getCalendarWeekdayTexts(locale);
    return {
        weekdayTexts,
        info: getCurrentCalendarMonths(locale),
        selectedDate: null,
        locale,
    };
};

export const reducer = (state: State, action: Action): State => {
    switch(action.type) {
        case ActionTypes.CHANGE_LOCALE:
            const locale = action.payload;
            if (locale === state.locale) {
                return state;
            }
            
            const weekdayTexts = getCalendarWeekdayTexts(locale);
            const { current } = state.info;
            return {
                ...state,
                weekdayTexts,
                info: getCalendarMonths(
                    current.year,
                    current.month,
                    locale
                ),
                locale,
            };
        case ActionTypes.PREV_MONTH:
            return { 
                ...state, 
                selectedDate: null,
                info: previousMonth(
                    state.info.previous,
                    state.locale,
                ) 
            };
        case ActionTypes.NEXT_MONTH:
            return { 
                ...state,
                selectedDate: null,
                info: nextMonth(
                    state.info.next,
                    state.locale,
                )
            };
        case ActionTypes.JUMP_MONTH:
            return { 
                ...state,
                selectedDate: null,
                info: jumpMonth(
                    action.payload,
                    state.locale,
                ),
            };
        case ActionTypes.SELECT_DATE:
            return {
                ...state,
                selectedDate: action.payload,
            };
        default: {
            const _exhaustiveCheck: never = action;
            throw new Error(`Unhandled action type: ${(_exhaustiveCheck as Action).type}`);
        }
    }
};