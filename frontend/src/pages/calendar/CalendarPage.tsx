import CalendarProvider from "@/contexts/calendar/CalendarProvider";
import { CalendarLocale } from "@/domains/calendar/calendarLocale";

const CalendarPage = () => {
    return (
        <CalendarProvider
            locale={ CalendarLocale.KR }
        >
            main
        </CalendarProvider>
    );
};

export default CalendarPage;