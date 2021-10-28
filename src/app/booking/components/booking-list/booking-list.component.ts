import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BookingService} from "../../services/booking.service";
import {v4} from "uuid";
import {MatDialog} from "@angular/material/dialog";
import {BookMilageComponent} from "../book-milage/book-milage.component";
import {fullSizeDialogConfig} from "../../../app-common/common";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-booking-list',
    templateUrl: './booking-list.component.html',
    styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

    public amountSpent!: Observable<any[]>;
    public amountPaid!: Observable<any[]>;
    public fullSpent!: Observable<any[]>;

    constructor(public bookingService: BookingService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.amountSpent = this.getChartDataByValue('amountSpent');
        this.amountPaid = this.getChartDataByValue('amountPaid', true);
        this.fullSpent = this.getChartDataByValue('fullSpent', false);
    }

    getChartDataByValue(valueProp: string, withZero?: boolean) {
        return this.bookingService.getTravelDiaryList().pipe(
            map(item => withZero ? item : item.filter(acc => !['0', 0].includes(acc[valueProp]))),
            map(arr => arr.map(acc => {
                const _date = new Date(acc.creationDate);
                return {
                    month: (<Date>_date).getMonth()+1,
                    day: (<Date>_date).getDate(),
                    value: acc[valueProp]
                };
            }).sort((a, b) => Number(`${a.month}.${a.day}`)  - Number(`${b.month}.${b.day}`))),
        );
    }

    addToList() {
        this.dialog.open(BookMilageComponent, {
            ...fullSizeDialogConfig,
            data: { editMode: true}
        }).afterClosed().subscribe((data) => {
            if(data) {
                this.bookingService.addToList({
                    id: v4(),
                    ...data,
                });
            }
        });
    }
}
