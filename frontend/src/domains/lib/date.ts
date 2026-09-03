export type MonthType = {
    year: number;
    month: number;
    lastDate: number;
    firstDayIndex: number;
    lastDayIndex: number;    
};

export type DateType = {
    year: number;
    month: number;
    date: number;
    dayIndex: number;
    isCurrentMonthDate: boolean;
    weekNo: number;
};