import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {VehicleDataType} from "../../../../app-common/interfaces/common.interface";

@Component({
    selector: 'app-add-transport-type-dialog',
    templateUrl: './add-transport-type-dialog.component.html',
    styleUrls: ['./add-transport-type-dialog.component.scss']
})
export class AddTransportTypeDialogComponent implements OnInit {

    public editMode: boolean = true;
    public model!: VehicleDataType;

    constructor(@Inject(MAT_DIALOG_DATA) private item: {model: any, editMode: boolean}) {
    }

    ngOnInit(): void {
        this.model = this.item?.model || {};
        // empty object init
        this.model = {
            ...this.model as any,
        }
        this.model.creationDate = this.model.creationDate || new Date();
        this.editMode = !!this.item?.editMode;
    }

}
