import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BookingService} from "../../services/booking.service";
import {BookingListType} from "../../../app-common/interfaces/common.interface";
import {v4} from "uuid";
import {MatDialog} from "@angular/material/dialog";
import {BookMilageComponent} from "../book-milage/book-milage.component";
import {fullSizeDialogConfig} from "../../../app-common/common";
import {filter, map} from "rxjs/operators";
import {SessionStorage} from "ngx-webstorage";

@Component({
    selector: 'app-booking-list',
    templateUrl: './booking-list.component.html',
    styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

    @SessionStorage('currentDisplayStyle')
    public currentDisplayStyle!: string;

    public bookingListSource!: Observable<BookingListType[]>;
    public amountSpent!: Observable<any[]>;
    public amountPaid!: Observable<any[]>;
    public fullSpent!: Observable<any[]>;
    public displayedColumns: string[] = ['date', 'distance', 'route', 'amountSpent', 'amountPaid', 'fullSpent', 'action'];

    constructor(public bookingService: BookingService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.bookingListSource = this.bookingService.getList();
        this.amountSpent = this.getChartDataByValue('amountSpent');
        this.amountPaid = this.getChartDataByValue('amountPaid', true);
        this.fullSpent = this.getChartDataByValue('fullSpent', false);
    }

    getChartDataByValue(valueProp: string, withZero?: boolean) {
        return this.bookingService.getList().pipe(
            map(item => withZero ? item : item.filter(acc => !['0', 0].includes(acc[valueProp]))),
            map(arr => arr.map(acc => {
                const _date = new Date(acc.date);
                return {
                    month: (<Date>_date).getMonth()+1,
                    day: (<Date>_date).getDate(),
                    value: acc[valueProp]
                };
            }).sort((a, b) => Number(`${a.month}.${a.day}`)  - Number(`${b.month}.${b.day}`))),
        );
    }

    openItem(item: BookingListType, mode: ('edit' | 'copy' | 'detail')) {
        this.dialog.open(BookMilageComponent, {
            ...fullSizeDialogConfig,
            data: {
                model: item,
                editMode: ['edit', 'copy'].includes(mode),
            }
        }).afterClosed().subscribe((data) => {
            if(data) {
                this.bookingService[mode === 'edit' ? 'editItem' : 'addToList']({
                    id: v4(),
                    ...data,
                });
            }
        });
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
