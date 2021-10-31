import {Inject, Injectable} from '@angular/core';
import {BOOKING_SERVICE, IBookingService} from "../../app-common/interfaces/booking-service.interface";
import {Observable} from "rxjs";
import {FuelCostDiaryType, TravelDiaryType} from "../../app-common/interfaces/common.interface";

@Injectable({
    providedIn: 'root',
})
export class BookingService implements IBookingService {

    constructor(@Inject(BOOKING_SERVICE) private _bookingService: IBookingService) {
    }

    addTravelDiary(addItem: TravelDiaryType): void {
        this._bookingService.addTravelDiary(addItem);
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
}
