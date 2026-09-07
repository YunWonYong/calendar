import { getCurrentCalendarMonths, jumpMonth, nextMonth, previousMonth } from "@/lib/calendar/calendar";
import { ActionTypes } from "@/domains/calendar/calendarReducer";

import type { Action, ActionType, InitializedState, State } from "@/domains/calendar/calendarReducer";

type AssertInitialized = (state: State, type: ActionType) => asserts state is InitializedState;

const assertInitialized: AssertInitialized = (state: State, type: ActionType) => {
    if (!state.isInitialized && type !== ActionTypes.INIT_CALENDAR) {
        throw new Error("Calendar state is not initialized.");
    }
}

export const reducer = (state: State, action: Action): State => {
    assertInitialized(state, action.type);
    switch(action.type) {
        case ActionTypes.INIT_CALENDAR:
            if (state.isInitialized) {
                throw new Error("already calendar state.");
            }
            
            const locale = action.payload;
            return {
                isInitialized: true,
                selectedDate: null,
                locale,
                months: getCurrentCalendarMonths(locale),
            };
        case ActionTypes.PREV_MONTH:
            return { 
                ...state, 
                selectedDate: null,
                months: previousMonth(
                    state.months.previous,
                    state.locale,
                ) 
            };
        case ActionTypes.NEXT_MONTH:
            return { 
                ...state,
                selectedDate: null,
                months: nextMonth(
                    state.months.next,
                    state.locale,
                )
            };
        case ActionTypes.JUMP_MONTH:
            return { 
                ...state,
                selectedDate: null,
                months: jumpMonth(
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