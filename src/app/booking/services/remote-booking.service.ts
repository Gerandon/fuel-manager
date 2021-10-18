import {Injectable} from '@angular/core';
import {IBookingService} from "../../app-common/interfaces/booking-service.interface";
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RemoteBookingService implements IBookingService {

    constructor() {
    }

    getList(): Observable<any[]> {
        return of([]);
    }

    addToList(): void {
    }
}
