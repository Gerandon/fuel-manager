import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, EventEmitter,
    Input,
    OnChanges,
    OnInit, Output,
    SimpleChanges, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import * as moment from "moment";
import {isMoment, Moment} from "moment";
import {CalendarHeaderDirection, TimelineData} from "../interfaces/calendar-common";

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

    public calendarMatrix: { inCurrentMonth: boolean, date: Date}[][];

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.date) {
            this.calendarMatrix = this.generateMatrixFromDate();
        }
    }

    public onMove(direction: CalendarHeaderDirection) {
        if (direction === CalendarHeaderDirection.LEFT) {
            this.date = this.getDate().subtract(1, 'month').toDate();
        } else {
            this.date = this.getDate().add(1, 'month').toDate();
        }
        this.calendarMatrix = this.generateMatrixFromDate();
        this.onIntervalChanged.emit(this.date);
    }

    public getRecording(date: Date) {
        return this.timelineData?.find(acc => moment(acc.date).format('yyyy.MM.DD') === moment(date).format('yyyy.MM.DD'))?.dayData || null
    }

    public generateMatrixFromDate(): { inCurrentMonth: boolean, date: Date}[][] {
        // Its just for initializing the size of the matrix
        const initialMatrix: any[][] = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ];
        const dateAsMom: Moment = moment(this.date);
        const monthStartWeekIndex = this.dayColumns.indexOf(dateAsMom.startOf('month').format('dddd'));
        const monthEndIndex = dateAsMom.endOf('month').date();

        let dayIndex = 0;
        return initialMatrix.map((week) => {
            return week.map(() => {
                dayIndex++;
                let loopDate: Date;
                let isInCurrentMonth = dayIndex >= (monthStartWeekIndex + 1) && dayIndex - 1 <= monthEndIndex;
                if (isInCurrentMonth) {
                    // LoopDate is in the current month
                    loopDate = moment(this.date).set('date',  dayIndex - monthStartWeekIndex).toDate();
                } else if (dayIndex > monthEndIndex) {
                    // LoopDate is after the current month last day
                    const newDayIndex = dayIndex - monthEndIndex;
                    loopDate = moment(this.date).endOf('month').add(newDayIndex + 1, 'days').toDate();
                } else {
                    // LoopDate is before the current month first day
                    loopDate = moment(this.date).startOf('month').subtract((monthEndIndex - 1) - dayIndex).toDate();
                }
                return {
                    inCurrentMonth: isInCurrentMonth,
                    date: loopDate
                };
            });
        });
    }

    private getDate(): Moment {
        return isMoment(this.date) ? (<Moment>this.date) : moment(this.date);
    }
}
