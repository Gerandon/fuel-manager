import {Injectable} from '@angular/core';
import {IBookingService} from "../../app-common/interfaces/booking-service.interface";
import {LocaleBookingService} from "./locale-booking.service";
import {RemoteBookingService} from "./remote-booking.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {BookingListType} from "../../app-common/interfaces/common.interface";

@Injectable({
    providedIn: 'root'
})
export class BookingService implements IBookingService {

    private _bookingService!: IBookingService;

    constructor(private locale: LocaleBookingService,
                private remote: RemoteBookingService) {
        this._bookingService = !environment.remote ? locale : remote;
    }

    getList(): Observable<BookingListType[]> {
        return this._bookingService.getList();
    }

    addToList(addItem: BookingListType): void {
        this._bookingService.addToList(addItem);
    }

    removeItem(item: BookingListType) {
        this._bookingService.removeItem(item);
    }
}
