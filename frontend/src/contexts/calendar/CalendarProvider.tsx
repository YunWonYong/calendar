import { FC, ReactNode, useMemo, useReducer } from "react";

import { DEFAULT_CALENDAR_CONTEXT_MOTHS } from "@/domains/calendar/calendarContext";
import { ActionTypes } from "@/domains/calendar/calendarReducer";

import CalendarContext from "./CalendarContext";
import { reducer } from "./CalendarReducer";


import type { CalendarContextMonths, CalendarHandles } from "@/domains/calendar/calendarContext";
import type { CalendarLocaleType } from "@/domains/calendar/calendarLocale";

const CalendarProvider: FC<{ children: ReactNode, locale: CalendarLocaleType }> = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer, { isInitialized: false, locale: null, months: null, selectedDate: null });
    const months = useMemo<CalendarContextMonths>(() => {
        if (state.isInitialized) {
            return state.months;
        }

        return { ...DEFAULT_CALENDAR_CONTEXT_MOTHS };
    }, [state.isInitialized]);
    const handles = useMemo<CalendarHandles>(() => {
        return {
            previousMonth() {
                dispatch({ type: ActionTypes.PREV_MONTH });
            },
            selectDate(date) {
                dispatch({ type: ActionTypes.SELECT_DATE, payload: date });
            },
            nextMonth() {
                dispatch({ type: ActionTypes.NEXT_MONTH });
            },
            jumpMonth(date) {
                dispatch({ type: ActionTypes.JUMP_MONTH, payload: date });
            },
        };
    }, []);
    return (
        <CalendarContext.Provider
            value={{
                isInitialized: state.isInitialized,
                months,
                selectedDate: null,
                handles,
            }}
        >
            {
                children
            }
        </CalendarContext.Provider>
    );
};

export default CalendarProvider;