import { createContext } from "react";

import type { CalendarContextType } from "@/domains/calendar/calendarContext";

const CalendarContext = createContext<CalendarContextType | null>(null);

export default CalendarContext;