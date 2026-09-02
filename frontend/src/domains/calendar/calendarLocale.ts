export const CalendarLocale = {
    KR: "KR",
    EN: "EN",
    ZH: "ZH"
} as const;

export type CalendarLocaleType = typeof CalendarLocale[keyof typeof CalendarLocale];


export type MonthKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const CALENDAR_MONTH_TEXTS: Record<CalendarLocaleType, Record<MonthKey, string>> = {
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