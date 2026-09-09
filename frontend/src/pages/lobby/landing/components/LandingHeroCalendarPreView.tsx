import { CalendarEventMainTypes } from "@/domains/calendar/calendarType";
import { CalendarLocale } from "@/domains/calendar/calendarLocale";
import { getCalendarMonths, getCalendarWeekdayTexts } from "@/lib/calendar/calendar";
import CalendarViewer from "@/pages/calendar/components/CalendarViewer";

import type { CalendarEventCounts } from "@/domains/calendar/calendarType";
import type { Month_1_To_12 } from "@/domains/lib/date";

const eventInfo: CalendarEventCounts = {
    "2026-8-30":  {
        [CalendarEventMainTypes.MISSION]: 2,
        [CalendarEventMainTypes.SCHEDULE]: 1,
        [CalendarEventMainTypes.TRANSACTION]: 0,
    },
    "2026-9-1":  {
        [CalendarEventMainTypes.MISSION]: 0,
        [CalendarEventMainTypes.SCHEDULE]: 4,
        [CalendarEventMainTypes.TRANSACTION]: 0,
    },
    "2026-9-8":  {
        [CalendarEventMainTypes.MISSION]: 3,
        [CalendarEventMainTypes.SCHEDULE]: 0,
        [CalendarEventMainTypes.TRANSACTION]: 0,
    },
    "2026-9-9":  {
        [CalendarEventMainTypes.MISSION]: 3,
        [CalendarEventMainTypes.SCHEDULE]: 1,
        [CalendarEventMainTypes.TRANSACTION]: 3,
    },
    "2026-9-10":  {
        [CalendarEventMainTypes.MISSION]: 3,
        [CalendarEventMainTypes.SCHEDULE]: 1,
        [CalendarEventMainTypes.TRANSACTION]: 3,
    },
    "2026-9-14":  {
        [CalendarEventMainTypes.MISSION]: 0,
        [CalendarEventMainTypes.SCHEDULE]: 3,
        [CalendarEventMainTypes.TRANSACTION]: 1,
    },
    "2026-9-15":  {
        [CalendarEventMainTypes.MISSION]: 0,
        [CalendarEventMainTypes.SCHEDULE]: 0,
        [CalendarEventMainTypes.TRANSACTION]: 1,
    },
    "2026-9-25":  {
        [CalendarEventMainTypes.MISSION]: 2,
        [CalendarEventMainTypes.SCHEDULE]: 1,
        [CalendarEventMainTypes.TRANSACTION]: 3,
    },
    "2026-10-1":  {
        [CalendarEventMainTypes.MISSION]: 0,
        [CalendarEventMainTypes.SCHEDULE]: 1,
        [CalendarEventMainTypes.TRANSACTION]: 0,
    },
    "2026-10-7":  {
        [CalendarEventMainTypes.MISSION]: 4,
        [CalendarEventMainTypes.SCHEDULE]: 8,
        [CalendarEventMainTypes.TRANSACTION]: 1,
    },
    "2026-10-10":  {
        [CalendarEventMainTypes.MISSION]: 3,
        [CalendarEventMainTypes.SCHEDULE]: 2,
        [CalendarEventMainTypes.TRANSACTION]: 3,
    },
};
const LandingHeroCalendarPreview = () => {
    const info = getCalendarMonths(2026, 9 as Month_1_To_12, CalendarLocale.KR);
    const weekdayTexts = getCalendarWeekdayTexts(CalendarLocale.KR);
    info.current.today = "2026-9-25";
    return (
        <CalendarViewer 
            info={ info }
            weekdayTexts={ weekdayTexts }
            isActive={ false }
            selectedDate={ null }
            handles={ null }
            eventCounts={ eventInfo }
        />
    );
};

export default LandingHeroCalendarPreview;