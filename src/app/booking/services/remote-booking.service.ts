import {Injectable} from '@angular/core';
import {IBookingService} from "../../app-common/interfaces/booking-service.interface";
import {Observable, of} from "rxjs";
import {FuelCostDiaryType, TravelDiaryType} from "../../app-common/interfaces/common.interface";

@Injectable({
    providedIn: 'root'
})
export class RemoteBookingService implements IBookingService {

    constructor() {
    }

    getTravelDiaryList(): Observable<TravelDiaryType[]> {
        return of([]);
    }

    getFuelCostDiaryList(): Observable<FuelCostDiaryType[]> {
        return of([]);
    }

    addToList(): void {
    }

    editItem(item: any) {
    }

    removeItem(item: any) {
    }
}
