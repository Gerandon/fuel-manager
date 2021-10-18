import {Observable} from "rxjs";

export interface IBookingService {
    getList(): Observable<any[]>;
    addToList(addItem: any): void;
}
