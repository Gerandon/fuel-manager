import {Inject, Injectable} from '@angular/core';
import {BOOKING_SERVICE, IBookingService} from "../../app-common/interfaces/booking-service.interface";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {v4} from "uuid";
import { TravelDiaryType } from 'src/app/app-common/interfaces/travel-diary.interface';
import {FuelCostDiaryType} from "../../app-common/interfaces/fuel-cost.interface";

@Injectable({
    providedIn: 'root',
})
export class BookingService implements IBookingService {

    constructor(@Inject(BOOKING_SERVICE) private _bookingService: IBookingService) {
    }

    searchInTravelDiary(queryParams?: {key: keyof TravelDiaryType, value: string | number, operator?: string}[]): Observable<TravelDiaryType[]> {
        return this._bookingService.searchInTravelDiary(queryParams);
    }

    addTravelDiary(addItem: TravelDiaryType): void {
        this._bookingService.addTravelDiary({...addItem, id: v4()});
    }
    removeTravelDiary(item: TravelDiaryType): void {
        this._bookingService.removeTravelDiary(item);
    }
    editTravelDiary(item: TravelDiaryType): TravelDiaryType {
        return this._bookingService.editTravelDiary(item);
    }
    addFuelCost(addItem: FuelCostDiaryType): void {
        this._bookingService.addFuelCost(addItem);
    }
    removeFuelCost(item: FuelCostDiaryType): void {
        this._bookingService.removeFuelCost(item);
    }
    editFuelCost(item: FuelCostDiaryType): FuelCostDiaryType {
        return this._bookingService.editFuelCost(item);
    }

    getTravelDiaryList(): Observable<TravelDiaryType[]> {
        return this._bookingService.getTravelDiaryList();
    }

    getFuelCostDiaryList(): Observable<FuelCostDiaryType[]> {
        return this._bookingService.getFuelCostDiaryList();
    }

    getChartDataByValue(valueProp: string, withZero?: boolean) {
        return this.getTravelDiaryList().pipe(
            map(item => withZero ? item : item.filter(acc => !['0', 0].includes(acc[valueProp]))),
            map(arr => arr.map(acc => {
                const _date = new Date(acc.creationDate);
                return {
                    month: (<Date>_date).getMonth()+1,
                    day: (<Date>_date).getDate(),
                    value: acc[valueProp]
                };
            }).sort((a, b) => Number(`${a.month}.${a.day}`)  - Number(`${b.month}.${b.day}`))),
        );
    }

    searchInFuelCost(queryParams?: { key: keyof FuelCostDiaryType; value: string }[]): Observable<FuelCostDiaryType[]> {
        return this._bookingService.searchInFuelCost(queryParams);
    }
}
