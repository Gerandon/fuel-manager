import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {TravelDiaryType, VehicleDataType} from "../../../app-common/interfaces/common.interface";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
    selector: 'app-book-milage',
    templateUrl: './book-travel.component.html',
    styleUrls: ['./book-travel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BookTravelComponent implements OnInit {

    public editMode: boolean = true;
    public model!: TravelDiaryType;

    constructor(@Inject(MAT_DIALOG_DATA) private item: {model: any, editMode: boolean}) {
    }

    ngOnInit(): void {
        this.model = this.item?.model || {};
        // empty object init
        this.model = {
            vehicle: {} as VehicleDataType,
            route: { from: '', to: '', retour: false },
            ...this.model as any,
        }
        this.model.creationDate = this.model.creationDate || new Date();
        this.editMode = !!this.item?.editMode;
    }
}
