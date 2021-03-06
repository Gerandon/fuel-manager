import {Injectable} from '@angular/core';
import {IBookingService} from "../../app-common/interfaces/booking-service.interface";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {first, tap} from "rxjs/operators";
import {LocalStorageService} from "ngx-webstorage";
import {AuthService} from "../../auth/services/auth.service";
import {TravelDiaryType} from "../../app-common/interfaces/travel-diary.interface";
import {FuelCostDiaryType} from "../../app-common/interfaces/fuel-cost.interface";
import {TimelineData} from "../../app-common/modules/calendar/interfaces/calendar-common";

@Injectable({
    providedIn: 'root'
})
export class LocaleBookingService implements IBookingService {

    private travelIdentifier;
    private fuelIdentifier;
    private travelDiaryList = new BehaviorSubject<TravelDiaryType[]>([]);
    private fuelCostDiaryList = new BehaviorSubject<FuelCostDiaryType[]>([]);

    constructor(private localStorage: LocalStorageService,
                private authService: AuthService) {
        authService.getUserData().pipe(
            first(),
            tap(({username}) => {
                this.travelIdentifier = `${username}-|travel-diary`;
                this.fuelIdentifier = `${username}-|fuel-cost-list`;
                this.travelDiaryList.next(localStorage.retrieve(this.travelIdentifier)?.filter(item => item));
                this.fuelCostDiaryList.next(localStorage.retrieve(this.fuelIdentifier)?.filter(item => item));
            })
        ).subscribe();
    }

    searchInFuelCost(queryParams?: { key: keyof FuelCostDiaryType; value: string; }[]): Observable<FuelCostDiaryType[]> {
        throw new Error('Method not implemented.');
    }

    searchInTravelDiary(queryParams?: {key: keyof TravelDiaryType, value: string}[]): Observable<TravelDiaryType[]> {
        throw new Error('Method not implemented.');
    }

    addTravelDiary(addItem: TravelDiaryType): void {
        this.getTravelDiaryList().pipe(
            first(),
            tap((list) => {
                const _list: any[] = list || [];
                _list.push({...addItem});
                this.localStorage.store(this.travelIdentifier, _list);
                this.travelDiaryList.next(_list);
            })
        ).subscribe();
    }
    removeTravelDiary(item: TravelDiaryType): void {
        this.getTravelDiaryList().pipe(
            first(),
            tap((list) => {
                const _list = (list || []).filter(_item => _item.id !== item.id);
                this.localStorage.store(this.travelIdentifier, _list);
                this.travelDiaryList.next(_list);
            })
        ).subscribe();
    }
    editTravelDiary(item: TravelDiaryType): TravelDiaryType {
        this.getTravelDiaryList().pipe(
            first(),
            tap((list) => {
                const _tempList = list.map(acc => {
                    if (acc.id === item.id) {
                        return item;
                    }
                    return acc;
                });
                this.localStorage.store(this.travelIdentifier, _tempList);
                this.travelDiaryList.next(_tempList);
            })
        ).subscribe();
        return item;
    }
    addFuelCost(addItem: FuelCostDiaryType): void {
        this.getFuelCostDiaryList().pipe(
            first(),
            tap((list) => {
                const _list: any[] = list || [];
                _list.push({...addItem});
                this.localStorage.store(this.fuelIdentifier, _list);
                this.fuelCostDiaryList.next(_list);
            })
        ).subscribe();
    }
    removeFuelCost(item: FuelCostDiaryType): void {
        throw new Error('Method not implemented.');
    }
    editFuelCost(item: FuelCostDiaryType): FuelCostDiaryType {
        throw new Error('Method not implemented.');
    }

    getTravelDiaryList(): Observable<TravelDiaryType[]> {
        return this.travelDiaryList.asObservable();
    }

    getFuelCostDiaryList(): Observable<FuelCostDiaryType[]> {
        return this.fuelCostDiaryList.asObservable();
    }

    getTravelTimeline(trigger: Observable<any> | Subject<any>): Observable<TimelineData[]> {
        return undefined;
    }

    getFuelTimeline(dateTrigger: Observable<any> | Subject<any>): Observable<TimelineData[]> {
        return undefined;
    }
}
