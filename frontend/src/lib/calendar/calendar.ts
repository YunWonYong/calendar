import { getDateListByMonth_1_To_12 } from "../date/date";

import { CALENDAR_MONTH_SUFFIXES, CALENDAR_YEAR_SUFFIXES, CALENDAR_WEEKDAY_TEXTS, CALENDAR_SHORT_MONTH_TEXTS } from "@/domains/calendar/calendarLocale";
import { MAX_CALENDAR_DATE_LIST_SIZE, MAX_CALENDAR_WEEK_NO, MIN_CALENDAR_DATE_LIST_SIZE } from "@/domains/calendar/calendarType";

import type { CalendarLocaleType, MonthKey } from "@/domains/calendar/calendarLocale";
import type { CalendarDate, CalendarMonth, CalendarWeek } from "@/domains/calendar/calendarType";
import type { CalendarContextMonths } from "@/domains/calendar/calendarContext";
import type { DateType, Month_1_To_12 } from "@/domains/lib/date";

export const getCalendarWeekdayTexts = (locale: CalendarLocaleType): string[] => {
    const weekdayTexts = CALENDAR_WEEKDAY_TEXTS[locale];
    if (!weekdayTexts) {
        throw new Error(`${locale} not supported locale. [getCalendarMetadate]`);
    }
    
    return Array.from(
        { length: 7 },
        (_, index) => weekdayTexts[index],
    );
};

export const nextMonth = (currentMonth: CalendarMonth, locale: CalendarLocaleType) => {
    const { year, month } = calcMonth(
        currentMonth.year,
        currentMonth.month + 1,
    );
    return getCalendarMonths(year, month, locale);
};

export const previousMonth = (currentMonth: CalendarMonth, locale: CalendarLocaleType) => {
    const { year, month } = calcMonth(
        currentMonth.year,
        currentMonth.month - 1,
    );
    return getCalendarMonths(year, month, locale);
};

export const jumpMonth = (month: CalendarMonth, locale: CalendarLocaleType) => {
    return getCalendarMonths(
        month.year,
        month.month,
        locale,
    );
};

const calcMonth = (year: number, month: number) => {
    if (month < 1) {
        return { year: year -1, month: toMonth_1_To_12(12)};
    }

    if (month > 12) {
        return { year: year + 1, month: toMonth_1_To_12(1)};
    }

    return { year, month: toMonth_1_To_12(month) };
};

export const getCurrentCalendarMonths = (locale: CalendarLocaleType): CalendarContextMonths => {
    const d = new Date();
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth();
    const months = getCalendarMonths(year, toMonth_1_To_12(month + 1), locale);
    return months;
};

export const getCalendarMonths = (year: number, month: Month_1_To_12, locale: CalendarLocaleType): CalendarContextMonths => {
    const weeks = getCalendarWeeks(year, month, locale);
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
            ...formatCalendarMonth(
                year,
                month,
                locale,
            ),
            today: getToday(),
            weeks,
        },
        next: nextMonth,
    };
};

export const getCalendarWeeks = (year: number, month: Month_1_To_12, locale: CalendarLocaleType): CalendarWeek[] => {
    const dateList = getDateListByMonth_1_To_12(year, month);
    validateDateList(dateList);

    if (dateList.length < MAX_CALENDAR_DATE_LIST_SIZE) {
        fillWeeks(year, month, dateList);
    }
    return createCalendarWeeks(dateList, locale);
};

const validateDateList = (dateList: DateType[]) => {
    if (!Array.isArray(dateList)) {
        throw new Error("invalid date list.");
    }

    const size = dateList.length;

    if (
        size < MIN_CALENDAR_DATE_LIST_SIZE ||
        size > MAX_CALENDAR_DATE_LIST_SIZE ||
        size % 7 !== 0
    ) {
        throw new Error(`invalid date list size[${size}].`);
    }

    if (!dateList[0] || !dateList[size - 1]) {
        throw new Error("invalid date list data.");
    }
};

const fillWeeks = (year: number, month: number, dateList: DateType[]) => {
    const lastDate = dateList[dateList.length - 1];
    if (lastDate.isCurrentMonthDate) {
        fillWeeksByNextMonth(year, month, lastDate, dateList);
        return;
    }

    let weekNo = lastDate.weekNo + 1;
    let date = lastDate.date + 1;
    let dayIndex = 0;
    while (weekNo <= MAX_CALENDAR_WEEK_NO) {
        dateList.push({
            ...lastDate,
            date,
            dayIndex,
            weekNo,
            isCurrentMonthDate: false,
        });
        ++dayIndex;
        ++date;
        if (dayIndex === 7) {
            ++weekNo;
            dayIndex = 0;
        }
    }
};

const fillWeeksByNextMonth = (year: number, month: number, lastDate: DateType, dateList: DateType[]) => {
    const calcedMonth = calcMonth(year, month + 1);
    const nextDateList = getDateListByMonth_1_To_12(
        calcedMonth.year,
        calcedMonth.month,
    );
    let weekNo = lastDate.weekNo + 1;
    let i = 0;
    let dayIndex = 0;
    while (weekNo <= MAX_CALENDAR_WEEK_NO) {
        dateList.push({
            ...nextDateList[i],
            weekNo,
            dayIndex,
            isCurrentMonthDate: false,
        });
        ++i;
        ++dayIndex;
        if (dayIndex === 7) {
            ++weekNo;
            dayIndex = 0;
        }
    }
};

const createCalendarWeeks = (dateList: DateType[], locale: CalendarLocaleType): CalendarWeek[] => {
    const weeks: CalendarWeek[] = [];
    let week = createCalendarWeek(1);
    let i = 0;
    const size = dateList.length;
    while (i < size) {
        const data = dateList[i];
        if (data.weekNo > week.weekNo) {
            weeks.push(week);
            week = createCalendarWeek(data.weekNo);
        }

        week.dateList.push(
            createCalendarDate(data, locale),
        );
        ++i;
    }

    weeks.push(week);
    return weeks;
};

const createCalendarWeek = (weekNo: number): CalendarWeek => {
    return {
        weekNo,
        dateList: [],
    };
};

const createCalendarDate = (date: DateType, locale: CalendarLocaleType): CalendarDate => {
    const calendarMonth = formatCalendarMonth(
        date.year,
        toMonth_1_To_12(date.month + 1),
        locale,
    );
    return {
        ...calendarMonth,
        date: date.date,
        dateText: formatDate(date.date),
        dayIndex: date.dayIndex,
        dayOfWeek: formatDay(date.dayIndex, locale),
        isCurrentMonth: date.isCurrentMonthDate,
    };
};

const formatCalendarMonth = (year: number, month: Month_1_To_12, locale: CalendarLocaleType): CalendarMonth => {
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

const formatMonth = (month: Month_1_To_12, locale: CalendarLocaleType) => {
    const monthTexts = CALENDAR_SHORT_MONTH_TEXTS[locale];
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

const toMonth_1_To_12 = (month: number) => {
    if (month < 1 || month > 12) {
        throw new Error(`invalid month value. [${month}]`);
    }

    return month as Month_1_To_12;
};

const getToday = () => {
    const d = new Date();
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth();
    const date = d.getUTCDate();
    return `${year}-${month + 1}-${date}`;
};