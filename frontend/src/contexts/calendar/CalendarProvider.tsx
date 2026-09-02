import { FC, ReactNode, useMemo, useReducer } from "react";

import CalendarContext from "./CalendarContext";
import type { CalendarContextMonths, CalendarHandles } from "@/domains/calendar/calendarContext";

const CalendarProvider: FC<{ children: ReactNode }> = ({ children }) => {
    // const [ state, dispatch ] = useReducer();
    const months = useMemo<CalendarContextMonths>(() => {
        return {
            previous: {
                year: 0,
                yearText: "",
                month: 0,
                monthText: "",
            },
            current: {
                month: {
                    year: 0,
                    yearText: "",
                    month: 0,
                    monthText: "",
                },
                weeks: [],
            },
            next: {
                year: 0,
                yearText: "",
                month: 0,
                monthText: "",
            },
        };
    }, [])
    const handles = useMemo<CalendarHandles>(() => {
        return {
            previousMonth() {
                
            },
            selectDate(date) {
                
            },
            nextMonth() {
                
            },
            jumpMonth(date) {
                
            },
        };
    }, []);
    return (
        <CalendarContext.Provider
            value={{
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