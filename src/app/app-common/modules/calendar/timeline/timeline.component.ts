import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import * as moment from "moment";
import {CalendarHeaderDirection, TimelineData, TimelineDayItem} from "../interfaces/calendar-common";

@Component({
    selector: 'gerandon-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    host: { 'class': 'timeline' },
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
        return this.timelineData?.find(acc => moment(acc.date).format('yyyy.MM.DD') === moment(date).format('yyyy.MM.DD'))?.dayData || null;
    }

    /**
     * Where the magic happens
     * @param shift
     * @private
     */
    private generateMatrixFromDate(shift: number = 0): { inCurrentMonth: boolean, isCurrentDay: boolean, date: Date}[][] {
        // It's just for initializing the size of the matrix
        const initialMatrix: Date[][] = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
        ];
        const dateAsMoment: moment.Moment = moment(this.date).startOf('month');
        const monthFirstDayMatrixIndex = this.dayColumns.indexOf((!!shift
            ? dateAsMoment.add(shift, 'days')
            : dateAsMoment.subtract(shift, 'days')
        ).format('dddd'));
        const lastDayOfMonth = dateAsMoment.clone().endOf('month').date();
        let matrixIndex = 0;
        let monthDayIndex = 1;
        let nextMonthDayIndex = 1;
        return initialMatrix.map((week) => {
            return week.map(() => {
                let loopDate: Date;
                let isInCurrentMonth = matrixIndex >= monthFirstDayMatrixIndex && monthDayIndex <= lastDayOfMonth;
                if (isInCurrentMonth) {
                    // LoopDate is in the current month
                    loopDate = dateAsMoment.clone().set('date',  (matrixIndex - monthFirstDayMatrixIndex) + 1).toDate();
                    monthDayIndex++;
                } else if (matrixIndex >= (lastDayOfMonth + monthFirstDayMatrixIndex)) {
                    // LoopDate is after the current month last day
                    loopDate = cloneEndOfMonth(dateAsMoment)
                        .add(nextMonthDayIndex++, 'days').toDate();
                } else {
                    // LoopDate is before the current month first day
                    loopDate = cloneStartOfMonth(dateAsMoment)
                        .subtract(monthFirstDayMatrixIndex - matrixIndex, 'days').toDate();
                }
                matrixIndex++;
                return {
                    inCurrentMonth: isInCurrentMonth,
                    isCurrentDay: pure(moment(loopDate)) === pure(moment()),
                    date: loopDate
                };
            });
        });
    }

    private getDate(): moment.Moment {
        return moment.isMoment(this.date) ? (<moment.Moment>this.date) : moment(this.date);
    }
}
function pure(moment: moment.Moment): string {
    return moment.clone().format('yyyy.MM.DD');
}
function cloneEndOfMonth(moment: moment.Moment): moment.Moment {
    return moment.clone().endOf('month');
}
function cloneStartOfMonth(moment: moment.Moment): moment.Moment {
    return moment.clone().startOf('month');
}
