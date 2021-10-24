import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BookingService} from "../../services/booking.service";
import {BookingListType} from "../../../app-common/interfaces/common.interface";
import {v4} from "uuid";
import {MatDialog} from "@angular/material/dialog";
import {BookMilageComponent} from "../book-milage/book-milage.component";
import {fullSizeDialogConfig} from "../../../app-common/common";
import {filter, map, switchMap, tap} from "rxjs/operators";

@Component({
    selector: 'app-booking-list',
    templateUrl: './booking-list.component.html',
    styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

    public bookingListSource!: Observable<BookingListType[]>;
    public amountSpent!: Observable<any[]>;
    public displayedColumns: string[] = ['date', 'distance', 'route', 'amountSpent', 'amountPaid', 'fullSpent', 'action'];

    constructor(public bookingService: BookingService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.bookingListSource = this.bookingService.getList();
        this.amountSpent = this.bookingService.getList().pipe(
            map(item => item.map(acc => {
                const _date = new Date(acc.date);
                return {
                    month: (<Date>_date).getMonth()||1,
                    day: (<Date>_date).getDay()||1,
                    value: acc.amountSpent || -1
                };
            }).sort((a, b) => Number(`${a.month}.${a.day}`)  - Number(`${b.month}.${b.day}`))),
        );
    }

    openItem(item: BookingListType) {
        this.dialog.open(BookMilageComponent, {
            ...fullSizeDialogConfig,
            data: item
        }).afterClosed().subscribe((data) => {
            if(data) {
                this.bookingService.addToList({
                    id: v4(),
                    ...data,
                });
            }
        });
    }

    addToList() {
        this.dialog.open(BookMilageComponent, fullSizeDialogConfig).afterClosed().subscribe((data) => {
            if(data) {
                this.bookingService.addToList({
                    id: v4(),
                    ...data,
                });
            }
        });
    }
}
