import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {BookingService} from "../../services/booking.service";
import {MatDialog} from "@angular/material/dialog";
import {BookTravelComponent} from "../book-travel/book-travel.component";
import {fullSizeDialogConfig} from "../../../app-common/common";
import {map} from "rxjs/operators";
import {MatTabGroup} from "@angular/material/tabs";

@Component({
    selector: 'app-booking-list',
    templateUrl: './booking-list.component.html',
    styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

    @ViewChild('tabGroup') public tab!: MatTabGroup;

    public amountSpent!: Observable<any[]>;
    public amountPaid!: Observable<any[]>;
    public fullSpent!: Observable<any[]>;

    private tabIndexComponent;

    constructor(public bookingService: BookingService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.tabIndexComponent = [
            { index: 0, addComponent: BookTravelComponent, service: this.bookingService, addMethod: 'addTravelDiary'},
        ]
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
        const tabData = this.tabIndexComponent.find(item => item.index === this.tab.selectedIndex);
        if (tabData?.addComponent) {
            this.dialog.open(tabData.addComponent, {
                ...fullSizeDialogConfig,
                data: { editMode: true}
            }).afterClosed().subscribe((data) => {
                if(data) {
                    tabData.service[tabData.addMethod](data);
                }
            });
        }
    }
}
