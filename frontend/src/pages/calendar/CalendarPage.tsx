import CalendarProvider from "@/contexts/calendar/CalendarProvider";
import { LOCALE } from "@/domains/locale/locale";

const CalendarPage = () => {
    return (
        <CalendarProvider
            locale={ LOCALE.KR }
        >
            main
        </CalendarProvider>
    );
};

export default CalendarPage;