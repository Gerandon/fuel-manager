import {Observable} from "rxjs";
import {FuelCostDiaryType, TravelDiaryType} from "./common.interface";
import {InjectionToken} from "@angular/core";

export interface IBookingService {
    getTravelDiaryList(): Observable<TravelDiaryType[]>;
    getFuelCostDiaryList(): Observable<FuelCostDiaryType[]>;

    addTravelDiary(addItem: TravelDiaryType): void;
    removeTravelDiary(item: TravelDiaryType): void;
    editTravelDiary(item: TravelDiaryType): TravelDiaryType;

    addFuelCost(addItem: FuelCostDiaryType): void;
    removeFuelCost(item: FuelCostDiaryType): void;
    editFuelCost(item: FuelCostDiaryType): FuelCostDiaryType;
}
export let BOOKING_SERVICE = new InjectionToken<IBookingService>('IBookingService injection token');
