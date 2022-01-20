import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {BookingService} from "../../../services/booking.service";
import {FuelCostDiaryType} from "../../../../app-common/interfaces/fuel-cost.interface";
import {v4} from "uuid";
import {BookFuelComponent} from "../../book-fuel/book-fuel.component";

@Component({
    selector: 'app-fuel-cost-diary',
    templateUrl: './fuel-cost-diary.component.html',
    styleUrls: ['./fuel-cost-diary.component.scss']
})
export class FuelCostDiaryComponent implements OnInit {

    @Input() queryParams?: {key: keyof FuelCostDiaryType, value: string, operator?: string}[];

    public fuelCostDiarySource!: Observable<FuelCostDiaryType[]>;
    public displayedColumns: string[] = ['creationDate', 'quantity', 'amountSpent', 'amountPaid', 'fullSpent', 'ACTION'];

    constructor(private dialog: MatDialog,
                public bookingService: BookingService) {
        this.fuelCostDiarySource = this.bookingService.getFuelCostDiaryList();
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.queryParams) {
            this.fuelCostDiarySource = this.bookingService.searchInFuelCost(this.queryParams);
        }
    }

    openItem(item: FuelCostDiaryType, mode: ('edit' | 'copy' | 'detail')) {
        this.dialog.open(BookFuelComponent, {
            data: {
                model: item,
                editMode: ['edit', 'copy'].includes(mode),
            }
        }).afterClosed().subscribe((data) => {
            if(data) {
                this.bookingService[mode === 'edit' ? 'editFuelCost' : 'addFuelCost']({
                    id: v4(),
                    ...data,
                });
            }
        });
    }
}
