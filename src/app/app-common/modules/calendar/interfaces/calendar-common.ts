export enum CalendarHeaderDirection {
    LEFT = 'left',
    RIGHT = 'right'
}
export interface TimelineDayItemProp {
    index?: number;
    value?: string;
}
export interface TimelineDayItem {
    separator: string;
    color: { background: string; foreground: string; };
    props: TimelineDayItemProp[];
}
export interface TimelineData {
    date: Date;
    dayData: TimelineDayItem[];
}
