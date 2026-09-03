import { getDateList } from "../date/date";

import { CALENDAR_MONTH_SUFFIXES, CALENDAR_FULL_MONTH_TEXTS, CALENDAR_YEAR_SUFFIXES, CalendarLocaleType, MonthKey, CALENDAR_WEEKDAY_TEXTS } from "@/domains/calendar/calendarLocale";

import type { CalendarDate, CalendarMonth, CalendarWeek } from "@/domains/calendar/calendarType";
import type { CalendarContextMonths } from "@/domains/calendar/calendarContext";
import type { DateType } from "@/domains/lib/date";

export const nextMonth = (currentMonth: CalendarMonth, locale: CalendarLocaleType) => {
    const { year, month } = calcMonth(
        currentMonth.year,
        currentMonth.month + 1
    );
    return getMonths(year, month, locale);
};

export const prevMonth = (currentMonth: CalendarMonth, locale: CalendarLocaleType) => {
    const { year, month } = calcMonth(
        currentMonth.year,
        currentMonth.month - 1
    );
    return getMonths(year, month, locale);
};

export const jumpMonth = (month: CalendarMonth, locale: CalendarLocaleType) => {
    return getMonths(
        month.year,
        month.month,
        locale,
    );
};

const calcMonth = (year: number, month: number) => {
    if (month < 1) {
        return { year: year -1, month: 12 };
    }

    if (month > 12) {
        return { year: year + 1, month: 1 };
    }

    return { year, month };
};

export const getMonths = (year: number, month: number, locale: CalendarLocaleType): CalendarContextMonths => {
    const weeks = getWeeks(year, month, locale);
    const calcPrevMonth = calcMonth(year, month - 1);
    const previousMonth = formatCalendarMonth(
        calcPrevMonth.year,
        calcPrevMonth.month,
        locale,
    );
    const calcNextMonth = calcMonth(year, month + 1);
    const nextMonth = formatCalendarMonth(
        calcNextMonth.year,
        calcNextMonth.month,
        locale,
    );
    
    return {
        previous: previousMonth,
        current: {
            month: formatCalendarMonth(
                year,
                month,
                locale,
            ),
            weeks,
        },
        next: nextMonth,
    };
};

export const getWeeks = (year: number, month: number, locale: CalendarLocaleType): CalendarWeek[] => {
    if (month < 1 || month > 12) {
        throw new Error("invalid month.");
    }

    const dateList = getDateList(year, month -1);
    if (dateList.length < 42) {
        const lastEl = dateList[dateList.length - 1];
        if (lastEl.isCurrentMonthDate) {
            const nextMonthDateList = getDateList(year, month);
            let i = dateList.length;
            let j = 0;
            let weekNo = lastEl.weekNo + 1;
            while(i < 42) {
                dateList.push({
                    ...nextMonthDateList[j],
                    weekNo,
                    isCurrentMonthDate: false,
                });
                ++j;
                if (j % 7 === 0) {
                    weekNo += 1;
                }
                ++i;
            }
        } else {
            let i = dateList.length;
            let j = 0;
            let weekNo = lastEl.weekNo + 1;
            while(i < 42) {
                dateList.push({
                    year: lastEl.year,
                    month: lastEl.month,
                    date: lastEl.date + 1 + j,
                    dayIndex: j,
                    isCurrentMonthDate: false,
                    weekNo
                });
                ++j;
                ++i;
                if (j === 7) {
                    j = 0;
                    ++weekNo;
                }
            }
        }
    }

    return makeWeeks(dateList, locale);
};

const makeWeeks = (dateList: DateType[], locale: CalendarLocaleType): CalendarWeek[] => {
    const weeks: CalendarWeek[] = [];
    let week = newWeek(1);
    let i = 0;
    const size = dateList.length;
    while (i < size) {
        const data = dateList[i];
        if (data.weekNo > week.weekNo) {
            weeks.push(week);
            week = newWeek(data.weekNo);
        }

        week.dateList.push(
            newCalendarDate(data, locale),
        );
        ++i;
    }

    weeks.push(week);
    return weeks;
};

const newWeek = (weekNo: number): CalendarWeek => {
    return {
        weekNo,
        dateList: [],
    };
};

const newCalendarDate = (date: DateType, locale: CalendarLocaleType): CalendarDate => {
    const calendarMonth = formatCalendarMonth(
        date.year,
        date.month + 1,
        locale,
    );
    return {
        ...calendarMonth,
        date: date.date,
        dateText: formatDate(date.date),
        dayOfWeek: formatDay(date.dayIndex, locale),
        isCurrentMonth: date.isCurrentMonthDate,
    };
};

const formatCalendarMonth = (year: number, month: number, locale: CalendarLocaleType): CalendarMonth => {
    return {
        year,
        yearText: formatYear(year, locale),
        month,
        monthText: formatMonth(month, locale),
    };
};

const formatYear = (year: number, locale: CalendarLocaleType) => {
    return `${year}${CALENDAR_YEAR_SUFFIXES[locale] || ""}`;
};

const formatMonth = (month: number, locale: CalendarLocaleType) => {
    const monthTexts = CALENDAR_FULL_MONTH_TEXTS[locale];
    if (!monthTexts) {
        throw new Error(`${locale} not supported locale. [formatMonth]`);
    }

    const monthText = monthTexts[month as MonthKey];

    return `${monthText}${CALENDAR_MONTH_SUFFIXES[locale] || ""}`;
};

const formatDate = (date: number) => {
    return date > 9? date.toString(): `0${date}`;
};

const formatDay = (day: number, locale: CalendarLocaleType) => {
    const weekdayTexts = CALENDAR_WEEKDAY_TEXTS[locale];
    if (!weekdayTexts) {
        throw new Error(`${locale} not supported locale. [formatDay]`);
    }

    const weekdayText = weekdayTexts[day];
    if (!weekdayText) {
        throw new Error(`${locale} not supported locale. [formatDay]`);
    }

    return weekdayText;
};