import * as moment from "moment";

export const compareYearMonth = (...dates: Date[]): boolean => {
    const _strings = dates.map(date => yearMonth(date));
    return _strings.every(acc => acc === _strings[0]);
};

export const compareDate = (...dates: Date[]): boolean => {
    const _strings = dates.map(date => yearMonthDay(date));
    return _strings.every(acc => acc === _strings[0]);
};

const formatDate = (date: Date, format: string) => moment(date).format(format);

export const yearMonth = (date: Date): string => formatDate(date, 'yyyy.MM');
export const yearMonthDay = (date: Date): string => formatDate(date, 'yyyy.MM.DD');
