import {Observable} from "rxjs";
import {BookingListType} from "./common.interface";
import {InjectionToken} from "@angular/core";

export interface IBookingService {
    getList(): Observable<any[]>;
    addToList(addItem: BookingListType): void;
    removeItem(item: BookingListType): void;
    editItem(item: BookingListType): void;
}
export let BOOKING_SERVICE = new InjectionToken<IBookingService>('IBookingService injection token');
