import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {BookingService} from "../../services/booking.service";
import {MatDialog} from "@angular/material/dialog";
import {BookTravelComponent} from "../book-travel/book-travel.component";
import {MatTabGroup} from "@angular/material/tabs";
import {BookFuelComponent} from "../book-fuel/book-fuel.component";
import {map, startWith, tap} from "rxjs/operators";
import {TimelineData} from "../../../app-common/modules/calendar/interfaces/calendar-common";
import {appTheming} from "../../../app-common/common";
import {TranslateService} from "@ngx-translate/core";
import {IBookingService} from "../../../app-common/interfaces/booking-service.interface";
import {UnsubscribeOnDestroy} from "../../../app-common/component-unsubscribe";
import {BookingListType} from "../../../app-common/interfaces/common.interface";

@Component({
    selector: 'app-booking-list',
    templateUrl: './booking-list.component.html',
    styleUrls: ['./booking-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BookingListComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('tabGroup') public tabGroup!: MatTabGroup;

    public appThemingRef = appTheming;
    public amountSpent!: Observable<any[]>;
    public amountPaid!: Observable<any[]>;
    public fullSpent!: Observable<any[]>;
    public dateFilter = {
        dateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        dateTo: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    };
    public travelQueryParams?: { key: keyof BookingListType, value: string | number, operator?: string}[];
    public fuelQueryParams?: { key: keyof BookingListType, value: string | number, operator?: string}[];
    @UnsubscribeOnDestroy() public actualTabLabel: Observable<string>;
    public timelineData: Observable<TimelineData[]>;
    public timelineDate = new BehaviorSubject<Date>(this.dateFilter.dateFrom);
    public timelineShift: Observable<number> = of(0);
    public actualTabIndex = new BehaviorSubject<number>(0);

    private tabIndexComponent: { index: number, addComponent: any, service: IBookingService, addMethod: string}[];

    constructor(public bookingService: BookingService,
                private translateService: TranslateService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.tabIndexComponent = [
            { index: 0, addComponent: BookTravelComponent, service: this.bookingService, addMethod: 'addTravelDiary'},
            { index: 1, addComponent: BookFuelComponent, service: this.bookingService, addMethod: 'addFuelCost'},
        ];
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
            this.actualTabLabel.pipe(
                tap(() => {
                    this.actualTabIndex.next(this.tabGroup.selectedIndex);
                    switch (this.tabGroup.selectedIndex) {
                        case 0:
                            this.timelineData = this.bookingService.getTravelTimeline(this.timelineDate);
                            break;
                        case 1:
                            this.timelineData = this.bookingService.getFuelTimeline(this.timelineDate);
                            break;
                        default:
                            this.timelineData = of(null);
                            break;
                    }
                })
            ).subscribe();
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

    ngOnDestroy() {
    }
}
