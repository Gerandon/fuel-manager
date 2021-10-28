import {Inject, Injectable} from '@angular/core';
import {BOOKING_SERVICE, IBookingService} from "../../app-common/interfaces/booking-service.interface";
import {Observable} from "rxjs";
import {BookingListType} from "../../app-common/interfaces/common.interface";

@Injectable({
    providedIn: 'root',
})
export class BookingService implements IBookingService {

    constructor(@Inject(BOOKING_SERVICE) private _bookingService: IBookingService) {
    }

    getList(): Observable<BookingListType[]> {
        return this._bookingService.getList();
    }

    addToList(addItem: BookingListType): void {
        this._bookingService.addToList(addItem);
    }

    editItem(item: BookingListType) {
        this._bookingService.editItem(item);
    }

    removeItem(item: BookingListType) {
        this._bookingService.removeItem(item);
    }
}
