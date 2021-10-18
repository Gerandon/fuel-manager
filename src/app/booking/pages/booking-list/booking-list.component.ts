import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BookingService} from "../../services/booking.service";
import {BookingListType} from "../../../app-common/interfaces/common.interface";
import {v4} from "uuid";

@Component({
    selector: 'app-booking-list',
    templateUrl: './booking-list.component.html',
    styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

    public bookingListSource!: Observable<BookingListType[]>;
    public displayedColumns: string[] = ['date', 'distance', 'route', 'amountSpent', 'amountPaid', 'fullSpent', 'action'];

    constructor(public bookingService: BookingService) {
    }

    ngOnInit(): void {
        this.bookingListSource = this.bookingService.getList();
        this.bookingListSource.subscribe(console.log);
    }

    addToList() {
        this.bookingService.addToList({
            id: v4(),
            date: new Date(),
            distance: Math.random(),
            fullSpent: 0
        });
    }
}
