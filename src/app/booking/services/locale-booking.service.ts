import {Injectable} from '@angular/core';
import {IBookingService} from "../../app-common/interfaces/booking-service.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {first, tap} from "rxjs/operators";
import {BookingListType} from "../../app-common/interfaces/common.interface";

@Injectable({
    providedIn: 'root'
})
export class LocaleBookingService implements IBookingService {

    private list = new BehaviorSubject<BookingListType[]>([]);

    constructor() {
        if (!localStorage.getItem('booking-list')) {
            localStorage.setItem('booking-list', JSON.stringify([
                {date: new Date(), distance: '100', route: 'Othon - Meló', amountSpent: 10000, amountPaid: 5000, fullSpent: 5000},
            ]));
        }
        // @ts-ignore
        this.list.next(JSON.parse(localStorage.getItem('booking-list')).filter(item => item));
    }

    getList(): Observable<BookingListType[]> {
        return this.list.asObservable();
    }

    addToList(addItem: BookingListType): void {
        this.getList().pipe(
            first(),
            tap((list) => {
                const _list: any[] = list || [];
                _list.push(addItem);
                localStorage.setItem('booking-list', JSON.stringify(_list));
                this.list.next(_list);
            })
        ).subscribe();
    }
}
