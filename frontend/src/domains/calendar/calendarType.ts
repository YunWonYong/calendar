import type { Month_1_To_12 } from "../lib/date";

export type CalendarMonth = {
    year: number;
    yearText: string;
    month: Month_1_To_12;
    monthText: string;
};

export type CalendarDate = {
    date: number;
    dateText: string;
    dayIndex: number;
    dayOfWeek: string;
    isCurrentMonth: boolean; // 현재 달과 다른 달의 날짜가 포함될 수 있음.
} & CalendarMonth;

export type CalendarCurrentDate = {
    today: string;
    weeks: CalendarWeek[];
} & CalendarMonth;

export type CalendarWeek = {
    weekNo: number; // 현재 달력에서의 주차
    dateList: CalendarDate[]; // size 7
};

export const MIN_CALENDAR_DATE_LIST_SIZE = 28;
export const MAX_CALENDAR_DATE_LIST_SIZE = 42;
export const MAX_CALENDAR_WEEK_NO = 6; // 6주