import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {BookingService} from "../../../services/booking.service";
import {FuelCostDiaryType} from "../../../../app-common/interfaces/fuel-cost.interface";

@Component({
    selector: 'app-fuel-cost-diary',
    templateUrl: './fuel-cost-diary.component.html',
    styleUrls: ['./fuel-cost-diary.component.scss']
})
export class FuelCostDiaryComponent implements OnInit {

    public fuelCostDiarySource!: Observable<FuelCostDiaryType[]>;
    public displayedColumns: string[] = ['creationDate', 'quantity', 'amountSpent', 'amountPaid', 'fullSpent', 'ACTION'];

    constructor(private dialog: MatDialog,
                public bookingService: BookingService) {
        this.fuelCostDiarySource = this.bookingService.getFuelCostDiaryList();
    }

    ngOnInit(): void {
    }

}
