import {Observable} from "rxjs";
import {BookingListType} from "./common.interface";

export interface IBookingService {
    getList(): Observable<any[]>;
    addToList(addItem: any): void;
    removeItem(item: BookingListType): void;
}
