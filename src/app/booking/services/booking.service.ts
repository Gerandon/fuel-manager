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

    getTravelDiaryList(): Observable<TravelDiaryType[]> {
        return this._bookingService.getTravelDiaryList();
    }

    getFuelCostDiaryList(): Observable<FuelCostDiaryType[]> {
        return this._bookingService.getFuelCostDiaryList();
    }

    addToList(addItem: any): void {
        this._bookingService.addToList(addItem);
    }

    editItem(item: any) {
        this._bookingService.editItem(item);
    }

    removeItem(item: any) {
        this._bookingService.removeItem(item);
    }
}
