import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {BookingListType, VehicleDataType} from "../../../app-common/interfaces/common.interface";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {transition, trigger, useAnimation} from "@angular/animations";

@Component({
    selector: 'app-book-milage',
    templateUrl: './book-milage.component.html',
    styleUrls: ['./book-milage.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BookMilageComponent implements OnInit {

    public editMode: boolean = true;
    public model!: BookingListType;

    constructor(@Inject(MAT_DIALOG_DATA) private item: {model: BookingListType, editMode: boolean}) {
    }

    ngOnInit(): void {
        this.model = this.item?.model || {};
        // empty object init
        this.model = {
            vehicle: {} as VehicleDataType,
            ...this.model
        }
        this.model.date = this.model.date || new Date();
        this.editMode = !!this.item?.editMode;
    }

    calculateFullSpent() {
        this.model.fullSpent = (this.model.amountSpent || 0) - (this.model.amountPaid || 0);
    }
}
