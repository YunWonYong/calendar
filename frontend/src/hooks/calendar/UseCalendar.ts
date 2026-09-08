import { useContext } from "react";
import CalendarContext from "@/contexts/calendar/CalendarContext";

const useCalendar = () => {
    const ctx = useContext(CalendarContext);
    if (!ctx) {
        throw new Error("useCalendar must be used within CalendarProvider");
    }
    const { info, metadata, selectedDate, handles } = ctx;
    return {
        info,
        weekdayTexts: metadata.weekdayTexts,
        selectedDate,
        handles,
    };
};

export default useCalendar;