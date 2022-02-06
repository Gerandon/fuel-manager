import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TravelDiaryType} from "../../../app-common/interfaces/travel-diary.interface";
import {VehicleDataType} from "../../../app-common/interfaces/vehicle.interface";

@Component({
    selector: 'app-book-milage',
    templateUrl: './book-travel.component.html',
    styleUrls: ['./book-travel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BookTravelComponent implements OnInit {

    public editable: boolean = true;
    public isNew: boolean = false;
    public model!: TravelDiaryType;

    constructor(@Inject(MAT_DIALOG_DATA) private item: {model: any, editMode: boolean}) {
    }

    ngOnInit(): void {
        this.isNew = !this.item?.model;
        this.model = this.item?.model || {};
        // empty object init
        this.model = {
            vehicle: {} as VehicleDataType,
            route: { from: '', to: '', retour: false },
            ...this.model as any,
        }
        this.model.date = this.model.date || new Date();
        this.editable = !!this.item?.editMode;
    }
}
