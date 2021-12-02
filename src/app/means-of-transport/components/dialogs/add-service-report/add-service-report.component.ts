import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ServiceReportType} from "../../../../app-common/interfaces/vehicle.interface";
import {defaultServiceReport} from "../../../../app-common/common";

@Component({
    selector: 'app-add-service-report',
    templateUrl: './add-service-report.component.html',
    styleUrls: ['./add-service-report.component.scss']
})
export class AddServiceReportComponent implements OnInit {

    public model: ServiceReportType = {
        ...defaultServiceReport,
        date: new Date(),
    };

    constructor(@Inject(MAT_DIALOG_DATA) private data: { vehicleId: string }) {
    }

    ngOnInit(): void {
        this.model.vehicleId = this.data.vehicleId;
    }

}
