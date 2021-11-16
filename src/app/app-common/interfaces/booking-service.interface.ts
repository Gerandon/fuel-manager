import {Observable} from "rxjs";
import {InjectionToken} from "@angular/core";
import { TravelDiaryType } from "./travel-diary.interface";
import {FuelCostDiaryType} from "./fuel-cost.interface";

export interface IBookingService {
    getTravelDiaryList(): Observable<TravelDiaryType[]>;
    getFuelCostDiaryList(): Observable<FuelCostDiaryType[]>;
    searchInTravelDiary(queryParams?: {key: keyof TravelDiaryType, value: string}): Observable<TravelDiaryType[]>

    addTravelDiary(addItem: TravelDiaryType): void;
    removeTravelDiary(item: TravelDiaryType): void;
    editTravelDiary(item: TravelDiaryType): TravelDiaryType;

    addFuelCost(addItem: FuelCostDiaryType): void;
    removeFuelCost(item: FuelCostDiaryType): void;
    editFuelCost(item: FuelCostDiaryType): FuelCostDiaryType;
}
export let BOOKING_SERVICE = new InjectionToken<IBookingService>('IBookingService injection token');
