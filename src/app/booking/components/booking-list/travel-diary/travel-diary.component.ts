import {Component, OnInit} from '@angular/core';
import {BookTravelComponent} from "../../book-travel/book-travel.component";
import {fullSizeDialogConfig} from "../../../../app-common/common";
import {v4} from "uuid";
import {MatDialog} from "@angular/material/dialog";
import {BookingService} from "../../../services/booking.service";
import {Observable} from "rxjs";
import {TravelDiaryType} from "../../../../app-common/interfaces/common.interface";

@Component({
    selector: 'app-travel-diary',
    templateUrl: './travel-diary.component.html',
    styleUrls: ['./travel-diary.component.scss']
})
export class TravelDiaryComponent implements OnInit {

    public travelDiarySource!: Observable<TravelDiaryType[]>;
    public distance!: Observable<any[]>;
    public displayedColumns: string[] = ['creationDate', 'distance', 'routeFrom', 'routeTo', 'retour', 'action'];

    constructor(private dialog: MatDialog,
                public bookingService: BookingService) {
        this.travelDiarySource = this.bookingService.getTravelDiaryList();
        this.distance = this.bookingService.getChartDataByValue('distance', true);
    }

    ngOnInit(): void {
    }

    openItem(item: TravelDiaryType, mode: ('edit' | 'copy' | 'detail')) {
        this.dialog.open(BookTravelComponent, {
            data: {
                model: item,
                editMode: ['edit', 'copy'].includes(mode),
            }
        }).afterClosed().subscribe((data) => {
            if(data) {
                this.bookingService[mode === 'edit' ? 'editTravelDiary' : 'addTravelDiary']({
                    id: v4(),
                    ...data,
                });
            }
        });
    }
}
