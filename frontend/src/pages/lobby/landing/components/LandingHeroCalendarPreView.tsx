import { CalendarLocale } from "@/domains/calendar/calendarLocale";
import { getCalendarWeekdayTexts, getCurrentCalendarMonths } from "@/lib/calendar/calendar";
import CalendarViewer from "@/pages/calendar/components/CalendarViewer";

const LandingHeroCalendarPreview = () => {
    const info = getCurrentCalendarMonths(CalendarLocale.KR);
    const weekdayTexts = getCalendarWeekdayTexts(CalendarLocale.KR);
    return (
        <CalendarViewer 
            info={ info }
            weekdayTexts={ weekdayTexts }
            isActive={ false }
            selectedDate={ null }
            handles={ null }
        />
    );
};

export default LandingHeroCalendarPreview;