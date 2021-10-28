import {Observable} from "rxjs";
import {FuelCostDiaryType, TravelDiaryType} from "./common.interface";
import {InjectionToken} from "@angular/core";

export interface IBookingService {
    getTravelDiaryList(): Observable<TravelDiaryType[]>;
    getFuelCostDiaryList(): Observable<FuelCostDiaryType[]>;

    addToList(addItem: any): void;
    removeItem(item: any): void;
    editItem(item: any): void;
}
export let BOOKING_SERVICE = new InjectionToken<IBookingService>('IBookingService injection token');
