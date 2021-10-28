import {Injectable} from '@angular/core';
import {IBookingService} from "../../app-common/interfaces/booking-service.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {first, tap} from "rxjs/operators";
import {FuelCostDiaryType, TravelDiaryType} from "../../app-common/interfaces/common.interface";
import {v4 as uuidv4} from 'uuid';
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
    providedIn: 'root'
})
export class LocaleBookingService implements IBookingService {

    private readonly travelIdentifier = 'booking-list';
    private readonly fuelIdentifier = 'fuel-cost-list';
    private travelDiaryList = new BehaviorSubject<TravelDiaryType[]>([]);
    private fuelCostDiaryList = new BehaviorSubject<FuelCostDiaryType[]>([]);

    constructor(private localStorage: LocalStorageService) {
        /*if (!localStorage.retrieve((this.travelIdentifier))) {
            localStorage.store(this.travelIdentifier, [
                {
                    id: uuidv4(),
                    date: new Date(),
                    distance: '100',
                    route: 'Othon - Meló',
                    amountSpent: 10000,
                    amountPaid: 5000,
                    fullSpent: 5000
                },
            ]);
        }*/
        this.travelDiaryList.next(localStorage.retrieve(this.travelIdentifier)?.filter(item => item));
        this.fuelCostDiaryList.next(localStorage.retrieve(this.fuelIdentifier)?.filter(item => item));
    }

    getTravelDiaryList(): Observable<TravelDiaryType[]> {
        return this.travelDiaryList.asObservable();
    }

    getFuelCostDiaryList(): Observable<FuelCostDiaryType[]> {
        return this.fuelCostDiaryList.asObservable();
    }

    addToList(addItem: any): void {
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

    editItem(item: any) {
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
    }

    removeItem(item: any): void {
        this.getTravelDiaryList().pipe(
            first(),
            tap((list) => {
                const _list = (list || []).filter(_item => _item.id !== item.id);
                this.localStorage.store(this.travelIdentifier, _list);
                this.travelDiaryList.next(_list);
            })
        ).subscribe();
    }
}
