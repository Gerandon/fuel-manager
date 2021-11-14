import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {BookingService} from "../../services/booking.service";
import {MatDialog} from "@angular/material/dialog";
import {BookTravelComponent} from "../book-travel/book-travel.component";
import {MatTabGroup} from "@angular/material/tabs";
import {BookFuelComponent} from "../book-fuel/book-fuel.component";
import {TravelDiaryType} from "../../../app-common/interfaces/travel-diary.interface";

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
    public travelQueryParams?: { key: keyof TravelDiaryType, value: string};
    public fuelQueryParams?: { key: keyof TravelDiaryType, value: string};
    public monthTabIndex = 0;
    public months = [
        'Január',
        'Február',
        'Március',
        'Április',
        'Május',
        'Június',
        'Július',
        'Augusztus',
        'Szeptember',
        'Október',
        'November',
        'December',
    ];

    private tabIndexComponent;

    constructor(public bookingService: BookingService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.tabIndexComponent = [
            { index: 0, addComponent: BookTravelComponent, service: this.bookingService, addMethod: 'addTravelDiary'},
            { index: 1, addComponent: BookFuelComponent, service: this.bookingService, addMethod: 'addFuelCost'},
        ]
        this.amountSpent = this.bookingService.getChartDataByValue('amountSpent');
        this.amountPaid = this.bookingService.getChartDataByValue('amountPaid', true);
        this.fullSpent = this.bookingService.getChartDataByValue('fullSpent', false);

        this.monthTabIndex = new Date().getMonth();
    }

    monthTabChange(event) {
        this.travelQueryParams = this.fuelQueryParams = { key: 'creationDate', value: event.index.toString()};
    }

    addToList() {
        const tabData = this.tabIndexComponent.find(item => item.index === this.tab.selectedIndex);
        if (tabData?.addComponent) {
            this.dialog.open(tabData.addComponent, {
                data: { editMode: true}
            }).afterClosed().subscribe((data) => {
                if(data) {
                    tabData.service[tabData.addMethod](data);
                }
            });
        }
    }
}
