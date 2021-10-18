import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BookingService} from "../../services/booking.service";
import {BookingListType} from "../../../app-common/interfaces/common.interface";

@Component({
    selector: 'app-booking-list',
    templateUrl: './booking-list.component.html',
    styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

    public bookingListSource!: Observable<BookingListType[]>;
    public displayedColumns: string[] = ['date', 'distance', 'route', 'amountSpent', 'amountPaid', 'fullSpent'];

    constructor(public bookingService: BookingService) {
    }

    ngOnInit(): void {
        this.bookingListSource = this.bookingService.getList();
        this.bookingListSource.subscribe(console.log);
    }

}
