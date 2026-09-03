import type { DateType, Month_0_To_11, Month_1_To_12, MonthType } from "@/domains/lib/date";

export const getDateListByMonth_1_To_12 = (year: number, month: Month_1_To_12) => {
    return getDateList(year, convertMonthType(month));
};

// 년도와 월에 따라 반환되는 배열의 사이즈가 유동적임. size: 28, 35, 42
export const getDateList = (year: number, month: Month_0_To_11): DateType[] => {
    const dateList: DateType[] = [];
    const currentDate = getCurrentMonth(year, month);
    const currentFirstDayIndex = currentDate.firstDayIndex;
    let weekNo = 1;
    if (currentFirstDayIndex > 0) {
        const prevDate = getPrevMonth(
            currentDate.year,
            currentDate.month,
        );
        let i = currentFirstDayIndex - 1;
        let dayIndex = 0;
        while(i > -1) {
            dateList.push({
                year: prevDate.year,
                month: prevDate.month,
                date: prevDate.lastDate - i,
                dayIndex: dayIndex,
                isCurrentMonthDate: false,
                weekNo,
            });
            --i;
            ++dayIndex;
        }
    }

    let lastDate = currentDate.lastDate
    let date = 1;
    let dayIndex = currentFirstDayIndex;
    while(date < lastDate + 1) {
        dateList.push({
            year: currentDate.year,
            month: currentDate.month,
            date,
            dayIndex: dayIndex,
            isCurrentMonthDate: true,
            weekNo,
        });
        ++date;
        ++dayIndex;
        if (dayIndex === 7) {
            dayIndex = 0;
            ++weekNo;
        }
    }

    if (currentDate.lastDayIndex < 6) {
        const nextMonth = getNextMonth(
            currentDate.year,
            currentDate.month,
        );
        const { lastDayIndex } = currentDate;
        let i = 1;
        do {
            dateList.push({
                year: nextMonth.year,
                month: nextMonth.month,
                date: i,
                dayIndex: lastDayIndex + i,
                isCurrentMonthDate: false,
                weekNo,
            });
            ++i;
        } while((i + lastDayIndex) < 7);
    }
    return dateList;
};

export const getCurrentMonth = (year: number, month: Month_0_To_11): MonthType => {
    const d = newUTCDate(year, month, 1);
    const d2 = newUTCDate(year, month + 1, 0);
    return {
        year,
        month: toMonth_0_To_11(month),
        lastDate: d2.getUTCDate(),
        firstDayIndex: d.getUTCDay(),
        lastDayIndex: d2.getUTCDay(),
    };
};

export const getPrevMonth = (year: number, month: Month_0_To_11): MonthType => {
    const d = newUTCDate(year, month, 0);
    const d2 = newUTCDate(year, month - 1, 1);
    return { 
        year: d.getUTCFullYear(), 
        month: toMonth_0_To_11(d.getUTCMonth()), 
        lastDate: d.getUTCDate(),
        firstDayIndex: d2.getUTCDay(), 
        lastDayIndex: d.getUTCDay(), 
    };
};

export const getNextMonth = (year: number, month: Month_0_To_11): MonthType => {
    const d = newUTCDate(year, month + 1, 1);
    const d2 = newUTCDate(year, month + 2, 0);
    return { 
        year: d.getUTCFullYear(), 
        month: toMonth_0_To_11(d.getUTCMonth()), 
        lastDate: d2.getUTCDate(),
        firstDayIndex: d.getUTCDay(), 
        lastDayIndex: d2.getUTCDay(), 
    };
};

const newUTCDate = (year: number, month: number, date: number = 1) => {
    return new Date(Date.UTC(year, month, date));
};

const toMonth_0_To_11 = (month: number) => {
    if (month < 0 || month > 11) {
        throw new Error(`invalid month value. [${month}]`);
    }

    return month as Month_0_To_11;
};

const convertMonthType = (month: Month_1_To_12): Month_0_To_11 => {
    return toMonth_0_To_11(month - 1);
};