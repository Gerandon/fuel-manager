import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {FuelCostDiaryType} from "../../../../app-common/interfaces/common.interface";
import {MatDialog} from "@angular/material/dialog";
import {BookingService} from "../../../services/booking.service";

@Component({
    selector: 'app-fuel-cost-diary',
    templateUrl: './fuel-cost-diary.component.html',
    styleUrls: ['./fuel-cost-diary.component.scss']
})
export class FuelCostDiaryComponent implements OnInit {

    public fuelCostDiarySource!: Observable<FuelCostDiaryType[]>;
    public displayedColumns: string[] = ['creationDate', 'amountSpent', 'amountPaid', 'fullSpent', 'action'];

    constructor(private dialog: MatDialog,
                public bookingService: BookingService) {
        this.fuelCostDiarySource = this.bookingService.getFuelCostDiaryList();
    }

    ngOnInit(): void {
    }

}
