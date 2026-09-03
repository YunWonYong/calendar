import { CalendarLocale } from "@/domains/calendar/calendarLocale";
import { getCalendarWeeks } from "./calendar";
import type { CalendarWeek } from "@/domains/calendar/calendarType";
import type { Month_1_To_12 } from "@/domains/lib/date";

const expectValidCalendarWeeks = (weeks: CalendarWeek[]) => {
    expect(weeks).toHaveLength(6);

    weeks.forEach((week, index) => {
        expect(week.weekNo).toBe(index + 1);
        expect(week.dateList).toHaveLength(7);
    });
};

describe("getWeeks 함수 테스트. KR locale", () => {
    test("case 1: 2026.09", () => {
        const year = 2026;
        const month = 9 as Month_1_To_12;
        const weeks = getCalendarWeeks(year, month, CalendarLocale.KR);
        expectValidCalendarWeeks(weeks);
        expect(weeks[0].dateList[0]).toMatchObject({
            year: 2026,
            yearText: "2026년",
            month: 8,
            monthText: "8월",
            date: 30,
            dateText: "30",
            dayOfWeek: "일",
            isCurrentMonth: false
        });
        expect(weeks[1].dateList[1]).toMatchObject({
            year: 2026,
            yearText: "2026년",
            month: 9,
            monthText: "9월",
            date: 7,
            dateText: "07",
            dayOfWeek: "월",
            isCurrentMonth: true
        });
        expect(weeks[5].dateList[6]).toMatchObject({
            year: 2026,
            yearText: "2026년",
            month: 10,
            monthText: "10월",
            date: 10,
            dateText: "10",
            dayOfWeek: "토",
            isCurrentMonth: false
        });
    });
    test("case 2: 2026.02", () => {
        const year = 2026;
        const month = 2 as Month_1_To_12;
        const weeks = getCalendarWeeks(year, month, CalendarLocale.KR);
        expectValidCalendarWeeks(weeks);

        expect(weeks[0].dateList[0]).toMatchObject({
            year: 2026,
            yearText: "2026년",
            month: 2,
            monthText: "2월",
            date: 1,
            dateText: "01",
            dayOfWeek: "일",
            isCurrentMonth: true
        });
        expect(weeks[1].dateList[1]).toMatchObject({
            year: 2026,
            yearText: "2026년",
            month: 2,
            monthText: "2월",
            date: 9,
            dateText: "09",
            dayOfWeek: "월",
            isCurrentMonth: true
        });
        expect(weeks[5].dateList[6]).toMatchObject({
            year: 2026,
            yearText: "2026년",
            month: 3,
            monthText: "3월",
            date: 14,
            dateText: "14",
            dayOfWeek: "토",
            isCurrentMonth: false
        });
    });
    test("case 3: 2026.03", () => {
        const year = 2026;
        const month = 3 as Month_1_To_12;
        const weeks = getCalendarWeeks(year, month, CalendarLocale.KR);
        expectValidCalendarWeeks(weeks);

        expect(weeks[0].dateList[0]).toMatchObject({
            year: 2026,
            yearText: "2026년",
            month: 3,
            monthText: "3월",
            date: 1,
            dateText: "01",
            dayOfWeek: "일",
            isCurrentMonth: true
        });
        expect(weeks[1].dateList[1]).toMatchObject({
            year: 2026,
            yearText: "2026년",
            month: 3,
            monthText: "3월",
            date: 9,
            dateText: "09",
            dayOfWeek: "월",
            isCurrentMonth: true
        });
        expect(weeks[5].dateList[6]).toMatchObject({
            year: 2026,
            yearText: "2026년",
            month: 4,
            monthText: "4월",
            date: 11,
            dateText: "11",
            dayOfWeek: "토",
            isCurrentMonth: false
        });
    });
    test("case 4: 2026.12", () => {
        const year = 2026;
        const month = 12 as Month_1_To_12;
        const weeks = getCalendarWeeks(year, month, CalendarLocale.KR);
        expectValidCalendarWeeks(weeks);

        expect(weeks[0].dateList[0]).toMatchObject({
            year: 2026,
            yearText: "2026년",
            month: 11,
            monthText: "11월",
            date: 29,
            dateText: "29",
            dayOfWeek: "일",
            isCurrentMonth: false
        });
        expect(weeks[1].dateList[1]).toMatchObject({
            year: 2026,
            yearText: "2026년",
            month: 12,
            monthText: "12월",
            date: 7,
            dateText: "07",
            dayOfWeek: "월",
            isCurrentMonth: true
        });
        expect(weeks[5].dateList[6]).toMatchObject({
            year: 2027,
            yearText: "2027년",
            month: 1,
            monthText: "1월",
            date: 9,
            dateText: "09",
            dayOfWeek: "토",
            isCurrentMonth: false
        });
    });
    test("case 5: 2028.02 윤달(Leap year)", () => {
        const year = 2028;
        const month = 2 as Month_1_To_12;
        const weeks = getCalendarWeeks(year, month, CalendarLocale.KR);
        expectValidCalendarWeeks(weeks);

        expect(weeks[0].dateList[0]).toMatchObject({
            year: 2028,
            yearText: "2028년",
            month: 1,
            monthText: "1월",
            date: 30,
            dateText: "30",
            dayOfWeek: "일",
            isCurrentMonth: false
        });
        expect(weeks[1].dateList[1]).toMatchObject({
            year: 2028,
            yearText: "2028년",
            month: 2,
            monthText: "2월",
            date: 7,
            dateText: "07",
            dayOfWeek: "월",
            isCurrentMonth: true
        });
        expect(weeks[4].dateList[2]).toMatchObject({
            year: 2028,
            yearText: "2028년",
            month: 2,
            monthText: "2월",
            date: 29,
            dateText: "29",
            dayOfWeek: "화",
            isCurrentMonth: true
        });
        expect(weeks[5].dateList[6]).toMatchObject({
            year: 2028,
            yearText: "2028년",
            month: 3,
            monthText: "3월",
            date: 11,
            dateText: "11",
            dayOfWeek: "토",
            isCurrentMonth: false
        });
    });
});
