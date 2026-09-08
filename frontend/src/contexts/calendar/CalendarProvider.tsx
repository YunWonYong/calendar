import { FC, ReactNode, useMemo, useReducer } from "react";

import { ActionTypes } from "@/domains/calendar/calendarReducer";

import CalendarContext from "./CalendarContext";
import { initCalendarState, reducer } from "./CalendarReducer";


import type { CalendarHandles } from "@/domains/calendar/calendarContext";
import type { CalendarLocaleType } from "@/domains/calendar/calendarLocale";

const CalendarProvider: FC<{ children: ReactNode, locale: CalendarLocaleType }> = ({ children, locale }) => {
    const [ state, dispatch ] = useReducer(reducer, initCalendarState(locale));
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
                metadata: {
                    weekdayTexts: state.weekdayTexts,
                },
                info: state.info,
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