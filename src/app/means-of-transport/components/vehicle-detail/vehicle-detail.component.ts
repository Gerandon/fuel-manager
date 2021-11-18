import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VehiclesService} from "../../services/vehicles/vehicles.service";
import {VehicleDataType} from "../../../app-common/interfaces/vehicle.interface";
import {Observable} from "rxjs";

@Component({
    selector: 'app-vehicle-detail',
    templateUrl: './vehicle-detail.component.html',
    styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {

    public vehicle!: Observable<VehicleDataType>;
    private vehicleId: string;

    constructor(private activatedRoute: ActivatedRoute,
                private vService: VehiclesService) {
        this.vehicleId = activatedRoute.snapshot.params.id;
    }

    ngOnInit(): void {
        this.vehicle = this.vService.getVehicle(this.vehicleId);
    }

}
