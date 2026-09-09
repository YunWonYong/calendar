import useCalendar from "@/hooks/calendar/UseCalendar";
import CalendarViewer from "./components/CalendarViewer";

const Calendar = () => {
    const { info, selectedDate, weekdayTexts, handles } = useCalendar();
    return (
        <CalendarViewer 
            info={ info }
            weekdayTexts={ weekdayTexts }
            isActive={ true }
            selectedDate={ selectedDate }
            handles={ handles }
            eventCounts={ {} }
        />
    );
};

export default Calendar;