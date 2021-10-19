import {Injectable} from '@angular/core';
import {IBookingService} from "../../app-common/interfaces/booking-service.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {first, tap} from "rxjs/operators";
import {BookingListType} from "../../app-common/interfaces/common.interface";
import { v4 as uuidv4 } from 'uuid';
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
    providedIn: 'root'
})
export class LocaleBookingService implements IBookingService {

    private readonly identifier = 'booking-list';
    private list = new BehaviorSubject<BookingListType[]>([]);

    constructor(private localStorage: LocalStorageService) {
        if (!localStorage.retrieve((this.identifier))) {
            localStorage.store(this.identifier,[
                {id: uuidv4(), date: new Date(), distance: '100', route: 'Othon - Meló', amountSpent: 10000, amountPaid: 5000, fullSpent: 5000},
            ]);
        }
        // @ts-ignore
        this.list.next(localStorage.retrieve(this.identifier).filter(item => item));
    }

    getList(): Observable<BookingListType[]> {
        return this.list.asObservable();
    }

    addToList(addItem: BookingListType): void {
        this.getList().pipe(
            first(),
            tap((list) => {
                const _list: any[] = list || [];
                _list.push({...addItem, id: uuidv4()});
                this.localStorage.store(this.identifier, _list);
                this.list.next(_list);
            })
        ).subscribe();
    }

    removeItem(item: BookingListType): void {
        this.getList().pipe(
            first(),
            tap((list) => {
                const _list = (list || []).filter(_item => _item.id !== item.id);
                this.localStorage.store(this.identifier, _list);
                this.list.next(_list);
            })
        ).subscribe();
    }
}
