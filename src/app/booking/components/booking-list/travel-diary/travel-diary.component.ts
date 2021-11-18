import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BookTravelComponent} from "../../book-travel/book-travel.component";
import {v4} from "uuid";
import {MatDialog} from "@angular/material/dialog";
import {BookingService} from "../../../services/booking.service";
import {Observable} from "rxjs";
import {TravelDiaryType} from "../../../../app-common/interfaces/travel-diary.interface";

@Component({
    selector: 'app-travel-diary',
    templateUrl: './travel-diary.component.html',
    styleUrls: ['./travel-diary.component.scss']
})
export class TravelDiaryComponent implements OnInit, OnChanges {

    @Input() queryParams?: {key: keyof TravelDiaryType, value: string};

    public travelDiarySource!: Observable<TravelDiaryType[]>;
    public distance!: Observable<any[]>;
    public displayedColumns: string[] = ['creationDate', 'distance', 'routeFrom', 'routeTo', 'retour', 'ACTION'];

    constructor(private dialog: MatDialog,
                public bookingService: BookingService) {
        this.distance = this.bookingService.getChartDataByValue('distance', true);
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.queryParams) {
            this.travelDiarySource = this.bookingService.searchInTravelDiary(this.queryParams);
        }
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
