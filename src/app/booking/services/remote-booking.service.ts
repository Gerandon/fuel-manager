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

    addTravelDiary(addItem: TravelDiaryType): void {
        throw new Error('Method not implemented.');
    }
    removeTravelDiary(item: TravelDiaryType): void {
        throw new Error('Method not implemented.');
    }
    editTravelDiary(item: TravelDiaryType): TravelDiaryType {
        throw new Error('Method not implemented.');
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
        return of([]);
    }

    getFuelCostDiaryList(): Observable<FuelCostDiaryType[]> {
        return of([]);
    }
}
