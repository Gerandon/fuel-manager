import {Component, Inject, OnInit} from '@angular/core';
import {FuelCostDiaryType} from "../../../app-common/interfaces/common.interface";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
    selector: 'app-book-fuel',
    templateUrl: './book-fuel.component.html',
    styleUrls: ['./book-fuel.component.scss']
})
export class BookFuelComponent implements OnInit {

    public editMode: boolean = true;
    public model!: FuelCostDiaryType;

    constructor(@Inject(MAT_DIALOG_DATA) private item: {model: any, editMode: boolean}) {
    }

    ngOnInit(): void {
        this.model = this.item?.model || {};
        this.model.creationDate = this.model.creationDate || new Date();
        this.editMode = !!this.item?.editMode;
    }
}

