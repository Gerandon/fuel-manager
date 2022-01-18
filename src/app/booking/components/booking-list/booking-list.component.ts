import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {BookingService} from "../../services/booking.service";
import {MatDialog} from "@angular/material/dialog";
import {BookTravelComponent} from "../book-travel/book-travel.component";
import {MatTabGroup} from "@angular/material/tabs";
import {BookFuelComponent} from "../book-fuel/book-fuel.component";
import {TravelDiaryType} from "../../../app-common/interfaces/travel-diary.interface";
import {map, startWith} from "rxjs/operators";

@Component({
    selector: 'app-booking-list',
    templateUrl: './booking-list.component.html',
    styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit, AfterViewInit {

    @ViewChild('tabGroup') public tabGroup!: MatTabGroup;

    public amountSpent!: Observable<any[]>;
    public amountPaid!: Observable<any[]>;
    public fullSpent!: Observable<any[]>;
    public dateFilter = {
        dateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        dateTo: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    };
    public travelQueryParams?: { key: keyof TravelDiaryType, value: string | number, operator?: string}[];
    public fuelQueryParams?: { key: keyof TravelDiaryType, value: string | number, operator?: string}[];
    public actualTabLabel: Observable<string>;

    private tabIndexComponent;

    constructor(public bookingService: BookingService,
                private dialog: MatDialog,
                private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.tabIndexComponent = [
            { index: 0, addComponent: BookTravelComponent, service: this.bookingService, addMethod: 'addTravelDiary'},
            { index: 1, addComponent: BookFuelComponent, service: this.bookingService, addMethod: 'addFuelCost'},
        ]
        this.amountSpent = this.bookingService.getChartDataByValue('amountSpent');
        this.amountPaid = this.bookingService.getChartDataByValue('amountPaid', true);
        this.fullSpent = this.bookingService.getChartDataByValue('fullSpent', false);
        this.onDateChange();
    }

    ngAfterViewInit() {
        // Fixme: Remove settimeout, i was too tired to figure out the expressionChanged error source
        setTimeout(() => {
            this.actualTabLabel = this.tabGroup.selectedTabChange.pipe(
                map(tab => tab.index),
                startWith(this.tabGroup.selectedIndex),
                map(index => this.tabGroup._tabs.get(index).textLabel)
            );
        });
    }

    onDateChange() {
        this.travelQueryParams = this.fuelQueryParams = [
            {
                key: 'date',
                value:  this.dateFilter.dateFrom.getTime(),
                operator: '>='
            },
            {
                key: 'date',
                value:  this.dateFilter.dateTo.getTime(),
                operator: '<='
            },
        ];
    }

    addToList() {
        const tabData = this.tabIndexComponent.find(item => item.index === this.tabGroup.selectedIndex);
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
