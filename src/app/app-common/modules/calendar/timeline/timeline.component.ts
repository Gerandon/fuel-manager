import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import * as moment from "moment";
import {Moment} from "moment";

@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent implements OnInit, OnChanges {

    @Input() public date: Date = new Date();

    public dayColumns = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    public dayRows = 5;

    public data = [];
    public calendarMatrix: { inCurrentMonth: boolean, date: Date}[][];

    private oneDay = [
        {
            type: 'Fuel',
            separator: '-',
            color: { background: '#198700', foreground: '#ffffff'},
            props: [
                { index: 1, value: `Spent: ${123}` },
            ]
        },
        {
            type: 'Travel',
            separator: '-',
            color: { background: '#c00000', foreground: '#ffffff'},
            props: [
                { index: 1, value: `Kilometers: ${123415}` },
            ]
        }
    ];

    constructor() {
        this.data = [
            {
                date: new Date('2022.02.28'),
                dayData: this.oneDay
            },
            {
                date: new Date('2022.03.10'),
                dayData: this.oneDay
            },
            {
                date: new Date('2022.03.15'),
                dayData: [
                    ...this.oneDay,
                    {
                        type: 'Travel',
                        separator: '-',
                        color: { background: '#c00000', foreground: '#ffffff'},
                        props: [
                            { index: 1, value: `Kilometers: ${123415}` },
                        ]
                    }
                ]
            }
        ];
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.date) {
            this.calendarMatrix = this.generateMatrixFromDate();
        }
    }

    public getRecording(date: Date) {
        return this.data.find(acc => moment(acc.date).format('yyyy.MM.DD') === moment(date).format('yyyy.MM.DD'))?.dayData || null
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
}
