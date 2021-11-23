import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VehiclesService} from "../../services/vehicles/vehicles.service";
import {VehicleDataType} from "../../../app-common/interfaces/vehicle.interface";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {TrafficLicenseComponent} from "../traffic-license/traffic-license.component";

@Component({
    selector: 'app-vehicle-detail',
    templateUrl: './vehicle-detail.component.html',
    styleUrls: ['./vehicle-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VehicleDetailComponent implements OnInit {

    public vehicle!: Observable<VehicleDataType>;
    private vehicleId: string;

    constructor(private activatedRoute: ActivatedRoute,
                private vService: VehiclesService,
                private dialog: MatDialog) {
        this.vehicleId = activatedRoute.snapshot.params.id;
    }

    ngOnInit(): void {
        this.vehicle = this.vService.getVehicle(this.vehicleId);
    }

    onLicenseClick() {
    }
}
