import { getCurrentMonth, getDateList, getNextMonth, getPrevMonth } from "./date";
import type { Month_0_To_11 } from "@/domains/lib/date";

describe("getCurrentMonth 함수 테스트.", () => {
    test("case 1: 2026.09", () => {
        const year = 2026;
        const month = 8 as Month_0_To_11;
        const currentDate = getCurrentMonth(year, month);
        expect(currentDate)
            .toMatchObject({
                year,
                month: 8,
                lastDate: 30,
                firstDayIndex: 2,
                lastDayIndex: 3,
            });
    });
    test("case 2: 2026.02", () => {
        const year = 2026;
        const month = 1 as Month_0_To_11;
        const currentDate = getCurrentMonth(year, month);
        expect(currentDate)
            .toMatchObject({
                year: 2026,
                month: 1,
                lastDate: 28,
                firstDayIndex: 0,
                lastDayIndex: 6,
            });
    });
    test("case 3: 2026.10", () => {
        const year = 2026;
        const month = 9 as Month_0_To_11;
        const currentDate = getCurrentMonth(year, month);
        expect(currentDate)
            .toMatchObject({
                year: 2026,
                month: 9,
                lastDate: 31,
                firstDayIndex: 4,
                lastDayIndex: 6,
            });
    });
    test("case 4: Leap year", () => {
        const year = 2024;
        const month = 1 as Month_0_To_11;
        const currentDate = getCurrentMonth(year, month);
        expect(currentDate)
            .toMatchObject({
                year: 2024,
                month: 1,
                lastDate: 29,
                firstDayIndex: 4,
                lastDayIndex: 4,
            });
    });
});

describe("getPrevMonth 함수 테스트.", () => {
    test("case 1: normal", () => {
        const year = 2026;
        const month = 8 as Month_0_To_11;
        const prevDate = getPrevMonth(year, month);
        expect(prevDate)
            .toMatchObject({
                year,
                month: 7,
                lastDate: 31,
                firstDayIndex: 6,
                lastDayIndex: 1,
            });
    });
    test("case 2: overflow year", () => {
        const year = 2026;
        const month = 0 as Month_0_To_11;
        const prevDate = getPrevMonth(year, month);
        expect(prevDate)
            .toMatchObject({
                year: 2025,
                month: 11,
                lastDate: 31,
                firstDayIndex: 1,
                lastDayIndex: 3,
            });
    });
    test("case 3: Leap year", () => {
        const year = 2024;
        const month = 2 as Month_0_To_11;
        const prevDate = getPrevMonth(year, month);
        expect(prevDate)
            .toMatchObject({
                year: 2024,
                month: 1,
                lastDate: 29,
                firstDayIndex: 4,
                lastDayIndex: 4,
            });
    });
});

describe("getNextDate 함수 테스트.", () => {
    test("case 1: normal", () => {
        const year = 2026;
        const month = 8 as Month_0_To_11;
        const prevDate = getNextMonth(year, month);
        expect(prevDate)
            .toMatchObject({
                year,
                month: 9,
                lastDate: 31,
                firstDayIndex: 4,
                lastDayIndex: 6,
            });
    });
    test("case 2: overflow year", () => {
        const year = 2026;
        const month = 11 as Month_0_To_11;
        const prevDate = getNextMonth(year, month);
        expect(prevDate)
            .toMatchObject({
                year: 2027,
                month: 0,
                lastDate: 31,
                firstDayIndex: 5,
                lastDayIndex: 0,
            });
    });
    test("case 3: Leap year", () => {
        const year = 2024;
        const month = 0 as Month_0_To_11;
        const prevDate = getNextMonth(year, month);
        expect(prevDate)
            .toMatchObject({
                year: 2024,
                month: 1,
                lastDate: 29,
                firstDayIndex: 4,
                lastDayIndex: 4,
            });
    });
});

describe("getDateList 함수 테스트.", () => {
    test("case 1: 2026.09", () => {
        const year = 2026;
        const month = 8 as Month_0_To_11;
        const dateList = getDateList(year, month);
        expect(Array.isArray(dateList)).toBeTruthy();
        expect(dateList.length).toBe(35);
        expect(dateList[0])
            .toMatchObject({
                year: 2026,
                month: 7,
                date: 30,
                dayIndex: 0,
                isCurrentMonthDate: false,
                weekNo: 1,
            });
        expect(dateList[1])
            .toMatchObject({
                year: 2026,
                month: 7,
                date: 31,
                dayIndex: 1,
                isCurrentMonthDate: false,
                weekNo: 1,
            });
        expect(dateList[2])
            .toMatchObject({
                year: 2026,
                month: 8,
                date: 1,
                dayIndex: 2,
                isCurrentMonthDate: true,
                weekNo: 1,
            });
        expect(dateList[31])
            .toMatchObject({
                year: 2026,
                month: 8,
                date: 30,
                dayIndex: 3,
                isCurrentMonthDate: true,
                weekNo: 5,
            });
        expect(dateList[dateList.length - 1])
            .toMatchObject({
                year: 2026,
                month: 9,
                date: 3,
                dayIndex: 6,
                isCurrentMonthDate: false,
                weekNo: 5,
            });
    });
    test("case 2: 2026.12", () => {
        const year = 2026;
        const month = 11 as Month_0_To_11;
        const dateList = getDateList(year, month);
        expect(Array.isArray(dateList)).toBeTruthy();
        expect(dateList.length).toBe(35);
        expect(dateList[0])
            .toMatchObject({
                year: 2026,
                month: 10,
                date: 29,
                dayIndex: 0,
                isCurrentMonthDate: false,
                weekNo: 1,
            });
        expect(dateList[1])
            .toMatchObject({
                year: 2026,
                month: 10,
                date: 30,
                dayIndex: 1,
                isCurrentMonthDate: false,
                weekNo: 1,
            });
        expect(dateList[2])
            .toMatchObject({
                year: 2026,
                month: 11,
                date: 1,
                dayIndex: 2,
                isCurrentMonthDate: true,
                weekNo: 1,
            });
        expect(dateList[32])
            .toMatchObject({
                year: 2026,
                month: 11,
                date: 31,
                dayIndex: 4,
                isCurrentMonthDate: true,
                weekNo: 5,
            });
        expect(dateList[dateList.length - 1])
            .toMatchObject({
                year: 2027,
                month: 0,
                date: 2,
                dayIndex: 6,
                isCurrentMonthDate: false,
                weekNo: 5,
            });
    });
    test("case 3: 2024.02 Leap year", () => {
        const year = 2024;
        const month = 1 as Month_0_To_11;
        const dateList = getDateList(year, month);
        expect(Array.isArray(dateList)).toBeTruthy();
        expect(dateList.length).toBe(35);
        expect(dateList[0])
            .toMatchObject({
                year: 2024,
                month: 0,
                date: 28,
                dayIndex: 0,
                isCurrentMonthDate: false,
                weekNo: 1,
            });
        expect(dateList[3])
            .toMatchObject({
                year: 2024,
                month: 0,
                date: 31,
                dayIndex: 3,
                isCurrentMonthDate: false,
                weekNo: 1,
            });
        expect(dateList[4])
            .toMatchObject({
                year: 2024,
                month: 1,
                date: 1,
                dayIndex: 4,
                isCurrentMonthDate: true,
                weekNo: 1,
            });
        expect(dateList[32])
            .toMatchObject({
                year: 2024,
                month: 1,
                date: 29,
                dayIndex: 4,
                isCurrentMonthDate: true,
                weekNo: 5,
            });
        expect(dateList[dateList.length - 1])
            .toMatchObject({
                year: 2024,
                month: 2,
                date: 2,
                dayIndex: 6,
                isCurrentMonthDate: false,
                weekNo: 5,
            });
    });
    test("case 4: 2027.01 size 42", () => {
        const year = 2027;
        const month = 0 as Month_0_To_11;
        const dateList = getDateList(year, month);
        expect(Array.isArray(dateList)).toBeTruthy();
        expect(dateList.length).toBe(42);
        expect(dateList[0])
            .toMatchObject({
                year: 2026,
                month: 11,
                date: 27,
                dayIndex: 0,
                isCurrentMonthDate: false,
                weekNo: 1,
            });
        expect(dateList[4])
            .toMatchObject({
                year: 2026,
                month: 11,
                date: 31,
                dayIndex: 4,
                isCurrentMonthDate: false,
                weekNo: 1,
            });
        expect(dateList[5])
            .toMatchObject({
                year: 2027,
                month: 0,
                date: 1,
                dayIndex: 5,
                isCurrentMonthDate: true,
                weekNo: 1,
            });
        expect(dateList[35])
            .toMatchObject({
                year: 2027,
                month: 0,
                date: 31,
                dayIndex: 0,
                isCurrentMonthDate: true,
                weekNo: 6,
            });
        expect(dateList[dateList.length - 1])
            .toMatchObject({
                year: 2027,
                month: 1,
                date: 6,
                dayIndex: 6,
                isCurrentMonthDate: false,
                weekNo: 6,
            });
    });
    test("case 5: 2026.02 size 28", () => {
        const year = 2026;
        const month = 1 as Month_0_To_11;
        const dateList = getDateList(year, month);
        expect(Array.isArray(dateList)).toBeTruthy();
        expect(dateList.length).toBe(28);
        expect(dateList[0])
            .toMatchObject({
                year: 2026,
                month: 1,
                date: 1,
                dayIndex: 0,
                isCurrentMonthDate: true,
                weekNo: 1,
            });
        expect(dateList[1])
            .toMatchObject({
                year: 2026,
                month: 1,
                date: 2,
                dayIndex: 1,
                isCurrentMonthDate: true,
                weekNo: 1,
            });
        expect(dateList[dateList.length - 1])
            .toMatchObject({
                year: 2026,
                month: 1,
                date: 28,
                dayIndex: 6,
                isCurrentMonthDate: true,
                weekNo: 4,
            });
    });
});