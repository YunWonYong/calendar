export type MonthType = {
    year: number;
    month: Month_0_To_11;
    lastDate: number;
    firstDayIndex: number;
    lastDayIndex: number;    
};

export type DateType = {
    year: number;
    month: Month_0_To_11;
    date: number;
    dayIndex: number;
    isCurrentMonthDate: boolean;
    weekNo: number;
};


export type Month_1_To_12 = number & { readonly __band: "Month1To12" };
export type Month_0_To_11 = number & { readonly __band: "Month0To11" };
