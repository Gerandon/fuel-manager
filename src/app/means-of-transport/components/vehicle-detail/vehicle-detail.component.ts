import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VehiclesService} from "../../services/vehicles/vehicles.service";
import {ServiceReportType, VehicleDataType} from "../../../app-common/interfaces/vehicle.interface";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddServiceReportComponent} from "../dialogs/add-service-report/add-service-report.component";
import {map, reduce} from "rxjs/operators";

@Component({
    selector: 'app-vehicle-detail',
    templateUrl: './vehicle-detail.component.html',
    styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {

    public vehicle!: Observable<VehicleDataType>;
    public serviceReports!: Observable<ServiceReportType[]>;
    public sumAmount: Observable<number>;
    private vehicleId: string;

    constructor(private activatedRoute: ActivatedRoute,
                private vService: VehiclesService,
                private dialog: MatDialog) {
        this.vehicleId = activatedRoute.snapshot.params.id;
    }

    ngOnInit(): void {
        this.vehicle = this.vService.getVehicle(this.vehicleId);
        this.serviceReports = this.vService.getServiceReports(this.vehicleId);
        this.sumAmount = this.serviceReports.pipe(
            map(array => array.map(acc => acc.amount)),
            map(array => array.reduce((sum, curr) => sum + curr, 0)),
        );
    }

    addServiceReport() {
        this.dialog.open(AddServiceReportComponent, {
            data: {
                vehicleId: this.vehicleId
            }
        }).afterClosed().subscribe(data => {
            if (data) {
                this.vService.addServiceReport(data);
            }
        });
    }

    onLicenseClick() {
    }
}
