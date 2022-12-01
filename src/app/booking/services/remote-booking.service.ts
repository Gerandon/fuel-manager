import {Injectable} from '@angular/core';
import {IBookingService} from "../../app-common/interfaces/booking-service.interface";
import {combineLatest, Observable, Subject} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {FirebaseDatabaseService} from "../../app-common/services/firebase-database.service";
import {TravelDiaryType} from "../../app-common/interfaces/travel-diary.interface";
import {FuelCostDiaryType} from 'src/app/app-common/interfaces/fuel-cost.interface';
import {TimelineData} from "../../app-common/modules/calendar/interfaces/calendar-common";
import {debounceTime, first, map, tap} from "rxjs/operators";
import * as moment from "moment";
import {compareDate, compareYearMonth} from "../../app-common/date-util";
import {appTheming} from "../../app-common/common";

@Injectable({
    providedIn: 'root',
})
export class RemoteBookingService implements IBookingService {

    private travelFbService!: FirebaseDatabaseService<TravelDiaryType>;
    private fuelFbService!: FirebaseDatabaseService<FuelCostDiaryType>;

    constructor(private firebaseDb: AngularFireDatabase) {
        this.travelFbService = new FirebaseDatabaseService(firebaseDb, 'travel-diary-list');
        this.fuelFbService = new FirebaseDatabaseService(firebaseDb, 'fuel-cost-list');
    }

    searchInFuelCost(queryParams?: { key: keyof FuelCostDiaryType; value: string; }[]): Observable<FuelCostDiaryType[]> {
        return this.fuelFbService.search(queryParams);
    }

    searchInTravelDiary(queryParams?: { key: keyof TravelDiaryType, value: string }[]): Observable<TravelDiaryType[]> {
        return this.travelFbService.search(queryParams);
    }

    addTravelDiary(addItem: TravelDiaryType): void {
        this.travelFbService.create(addItem);
    }

    removeTravelDiary(item: TravelDiaryType): void {
        this.travelFbService.delete(item).pipe(first()).subscribe();
    }

    editTravelDiary(item: TravelDiaryType): TravelDiaryType {
        this.travelFbService.update(item).pipe(first()).subscribe();
        return item;
    }

    addFuelCost(addItem: FuelCostDiaryType): void {
        this.fuelFbService.create(addItem);
    }

    removeFuelCost(item: FuelCostDiaryType): void {
        this.fuelFbService.delete(item).pipe(first()).subscribe();
    }

    editFuelCost(item: FuelCostDiaryType): FuelCostDiaryType {
        this.fuelFbService.update(item).pipe(first()).subscribe();
        return item;
    }

    getTravelDiaryList(): Observable<TravelDiaryType[]> {
        return this.travelFbService.getAll('date');
    }

    getFuelCostDiaryList(): Observable<FuelCostDiaryType[]> {
        return this.fuelFbService.getAll('date');
    }

    getTravelTimeline(dateTrigger: Observable<any> | Subject<any>): Observable<TimelineData[]> {
        return combineLatest([
            this.getTravelDiaryList(),
            dateTrigger,
        ]).pipe(
            debounceTime(300),
            map(([diaryList, timelineDate]) => diaryList.filter(acc => {
                const onConcreteDate = compareYearMonth(acc.date, timelineDate);
                const beforeMonth = compareYearMonth(acc.date, moment(timelineDate).subtract(1, 'month').toDate());
                const afterMonth = compareYearMonth(acc.date, moment(timelineDate).add(1, 'month').toDate());
                return onConcreteDate || beforeMonth || afterMonth;
            })),
            map((array: TravelDiaryType[]) => {
                return array.map(acc => {
                    return array.filter(accItem => compareDate(acc.date, accItem.date));
                });
            }),
            map((array:TravelDiaryType[][]) => array.map(acc => <TimelineData>({
                date: acc[0].date,
                dayData: acc.map(item => ({
                    color: { background: 'primary-background', foreground: '#ffffff' },
                    props: [
                        {index: 0, value: `${item.route.from} -> ${item.route.to}`},
                        {index: 1, value: `${item.distance} Km`},
                    ],
                    separator: '-'
                })),
            })))
        );
    }

    getFuelTimeline(dateTrigger: Observable<any> | Subject<any>): Observable<TimelineData[]> {
        return combineLatest([
            this.getFuelCostDiaryList(),
            dateTrigger,
        ]).pipe(
            debounceTime(300),
            map(([fuelList, timelineDate]) => fuelList.filter(acc => {
                const onConcreteDate = compareYearMonth(acc.date, timelineDate);
                const beforeMonth = compareYearMonth(acc.date, moment(timelineDate).subtract(1, 'month').toDate());
                const afterMonth = compareYearMonth(acc.date, moment(timelineDate).add(1, 'month').toDate());
                return onConcreteDate || beforeMonth || afterMonth;
            })),
            map((array: FuelCostDiaryType[]) => {
                return array.map(acc => {
                    return array.filter(accItem => compareDate(acc.date, accItem.date));
                });
            }),
            map((array:FuelCostDiaryType[][]) => array.map(acc => <TimelineData>({
                date: acc[0].date,
                dayData: acc.map(item => ({
                    color: (item.fullSpent > 0
                        ? { background: 'primary-background', foreground: '#ffffff' }
                        : { background: 'secondary-background', foreground: '#ffffff' }),
                    props: [
                        {index: 0, value: `${item.quantity} Liter`},
                        {index: 1, value: `${Math.abs(item.fullSpent)} HUF`},
                    ],
                    separator: '|'
                })),
            })))
        );
    }
}
