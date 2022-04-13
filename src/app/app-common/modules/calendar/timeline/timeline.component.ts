import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import * as moment from "moment";
import {isMoment, Moment} from "moment";
import {CalendarHeaderDirection, TimelineData, TimelineDayItem} from "../interfaces/calendar-common";

@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent implements OnChanges {

    @Input() public date: Date = new Date();
    @Input() public timelineData: TimelineData[] = [];
    @Input() public shift: number = 0;
    @Output() public onIntervalChanged = new EventEmitter<Date>();

    public dayColumns = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    public months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    public dayRows = 5;
    public calendarMatrix: { inCurrentMonth: boolean, isCurrentDay: boolean, date: Date}[][];
    public directionRef = CalendarHeaderDirection;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.date) {
            this.calendarMatrix = this.generateMatrixFromDate(this.shift);
            if (!!this.shift) {
                this.dayColumns = [
                    ...this.dayColumns.slice(this.dayColumns.length - this.shift, this.dayColumns.length),
                    ...this.dayColumns.slice(0, this.dayColumns.length - this.shift)
                ];
            }
        }
    }

    public onMove(direction?: CalendarHeaderDirection) {
        switch(direction) {
            case CalendarHeaderDirection.LEFT:
                this.date = this.getDate().subtract(1, 'month').toDate();
                break;
            case CalendarHeaderDirection.RIGHT:
                this.date = this.getDate().add(1, 'month').toDate();
                break;
            default:
                this.date = new Date();
                break;
        }
        this.calendarMatrix = this.generateMatrixFromDate(this.shift);
        this.onIntervalChanged.emit(this.date);
    }

    public getRecording(date: Date): TimelineDayItem[] | null {
        return this.timelineData?.find(acc => moment(acc.date).format('yyyy.MM.DD') === moment(date).format('yyyy.MM.DD'))?.dayData || null
    }

    private generateMatrixFromDate(shift: number = 0): { inCurrentMonth: boolean, isCurrentDay: boolean, date: Date}[][] {
        // Its just for initializing the size of the matrix
        const initialMatrix: Date[][] = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
        ];
        const dateAsMom: Moment = moment(this.date).startOf('month');
        const monthStartWeekIndex = this.dayColumns.indexOf((!!shift
            ? dateAsMom.add(shift, 'days')
            : dateAsMom.subtract(shift, 'days')
        ).format('dddd'));
        const monthEndIndex = dateAsMom.clone().endOf('month').date();

        let dayIndex = 0;
        return initialMatrix.map((week) => {
            return week.map(() => {
                dayIndex++;
                let loopDate: Date;
                let isInCurrentMonth = dayIndex >= (monthStartWeekIndex + 1) && dayIndex - 1 <= monthEndIndex;
                if (isInCurrentMonth) {
                    // LoopDate is in the current month
                    loopDate = dateAsMom.clone().set('date',  dayIndex - monthStartWeekIndex).toDate();
                } else if (dayIndex > monthEndIndex) {
                    // LoopDate is after the current month last day
                    const newDayIndex = dayIndex - monthEndIndex;
                    loopDate = TimelineComponent.cloneEndOfMonth(dateAsMom).add(newDayIndex - 1, 'days').toDate();
                } else {
                    // LoopDate is before the current month first day
                    loopDate = TimelineComponent.cloneStartOfMonth(dateAsMom).subtract((monthEndIndex - 1) - dayIndex).toDate();
                }
                return {
                    inCurrentMonth: isInCurrentMonth,
                    isCurrentDay: TimelineComponent.pure(moment(loopDate)) === TimelineComponent.pure(moment()),
                    date: loopDate
                };
            });
        });
    }

    private getDate(): Moment {
        return isMoment(this.date) ? (<Moment>this.date) : moment(this.date);
    }

    // private-static fields
    // this way they wont be instance-dependent

    private static pure(moment: Moment): string {
        return moment.clone().format('yyyy.MM.DD');
    }

    private static cloneEndOfMonth(moment: Moment): Moment {
        return moment.clone().endOf('month');
    }

    private static cloneStartOfMonth(moment: Moment): Moment {
        return moment.clone().startOf('month');
    }
}
