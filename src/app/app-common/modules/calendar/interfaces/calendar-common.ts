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
    color: {
        /**
         * CSS class
         */
        background: string;
        /**
         * style
         */
        foreground: string;
    };
    props: TimelineDayItemProp[];
}
export interface TimelineData {
    date: Date;
    dayData: TimelineDayItem[];
}
