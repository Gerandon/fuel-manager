import {Injectable} from '@angular/core';
import {IBookingService} from "../../app-common/interfaces/booking-service.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {first, tap} from "rxjs/operators";
import {FuelCostDiaryType, TravelDiaryType} from "../../app-common/interfaces/common.interface";
import {v4 as uuidv4} from 'uuid';
import {LocalStorageService} from "ngx-webstorage";
import {AuthService} from "../../auth/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class LocaleBookingService implements IBookingService {

    private readonly travelIdentifier;
    private readonly fuelIdentifier;
    private travelDiaryList = new BehaviorSubject<TravelDiaryType[]>([]);
    private fuelCostDiaryList = new BehaviorSubject<FuelCostDiaryType[]>([]);

    constructor(private localStorage: LocalStorageService,
                private authService: AuthService) {
        this.travelIdentifier = `${authService.getUserData().username}-|travel-diary`;
        this.fuelIdentifier = `${authService.getUserData().username}-|fuel-cost-list`;
        console.log(this.travelIdentifier);
        console.log(localStorage.retrieve(this.travelIdentifier));
        this.travelDiaryList.next(localStorage.retrieve(this.travelIdentifier)?.filter(item => item));
        this.fuelCostDiaryList.next(localStorage.retrieve(this.fuelIdentifier)?.filter(item => item));
    }

    addTravelDiary(addItem: TravelDiaryType): void {
        this.getTravelDiaryList().pipe(
            first(),
            tap((list) => {
                const _list: any[] = list || [];
                _list.push({...addItem, id: uuidv4()});
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
        throw new Error('Method not implemented.');
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
}
