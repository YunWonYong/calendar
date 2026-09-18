export const CalendarLocale = {
    KR: "KR",
    JP: "JP",
    ZH: "ZH",
    EN: "EN"
} as const;

export type CalendarLocaleType = typeof CalendarLocale[keyof typeof CalendarLocale];

export const CALENDAR_YEAR_SUFFIXES: Record<CalendarLocaleType, string> = {
    [CalendarLocale.KR]: "년",
    [CalendarLocale.ZH]: "年",
    [CalendarLocale.JP]: "年",
    [CalendarLocale.EN]: ""
};

export type MonthKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const CALENDAR_MONTH_SUFFIXES: Record<CalendarLocaleType, string> = {
    [CalendarLocale.KR]: "월",
    [CalendarLocale.ZH]: "月",
    [CalendarLocale.JP]: "月",
    [CalendarLocale.EN]: ""
};

export const CALENDAR_FULL_MONTH_TEXTS: Record<CalendarLocaleType, Record<MonthKey, string>> = {
    [CalendarLocale.KR]: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12"
    },
    [CalendarLocale.JP]: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12"
    },
    [CalendarLocale.ZH]: {
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
        7: "七",
        8: "八",
        9: "九",
        10: "十",
        11: "十一",
        12: "十二"
    },
    [CalendarLocale.EN]: {
        1: "January", // Jan
        2: "February", // Feb
        3: "March", // Mar
        4: "April", // Apr
        5: "May", // May
        6: "June", // Jun
        7: "July", // Jul
        8: "August", // Aug
        9: "September", // Sep
        10: "October", // Oct
        11: "November", // Nov
        12: "December" // Dec
    },
} as const;

export const CALENDAR_SHORT_MONTH_TEXTS: Record<CalendarLocaleType, Record<MonthKey, string>> = {
    [CalendarLocale.KR]: CALENDAR_FULL_MONTH_TEXTS[CalendarLocale.KR],
    [CalendarLocale.JP]: CALENDAR_FULL_MONTH_TEXTS[CalendarLocale.JP],
    [CalendarLocale.ZH]: CALENDAR_FULL_MONTH_TEXTS[CalendarLocale.ZH],
    [CalendarLocale.EN]: {
        1: "Jan", // Jan
        2: "Feb", // Feb
        3: "Mar", // Mar
        4: "Apr", // Apr
        5: "May", // May
        6: "Jun", // Jun
        7: "Jul", // Jul
        8: "Aug", // Aug
        9: "Sep", // Sep
        10: "Oct", // Oct
        11: "Nov", // Nov
        12: "Dec" // Dec
    },
} as const;

export const CALENDAR_WEEKDAY_TEXTS: Record<CalendarLocaleType, Record<number, string>> = {
    [CalendarLocale.KR]: {
        0: "일",
        1: "월",
        2: "화",
        3: "수",
        4: "목",
        5: "금",
        6: "토"
    },
    [CalendarLocale.JP]: {
        0: "日",
        1: "月",
        2: "火",
        3: "水",
        4: "木",
        5: "金",
        6: "土"
    },
    [CalendarLocale.ZH]: {
        0: "日",
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六"
    },
    [CalendarLocale.EN]: {
        0: "Sun",
        1: "Mon",
        2: "Tue",
        3: "Wed",
        4: "Thu",
        5: "Fri",
        6: "Sat"
    }
} as const;