import {Inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleDataType } from 'src/app/app-common/interfaces/common.interface';
import {IVehiclesService, VEHICLES_SERVICE} from "../../../app-common/interfaces/vehicles-service.interface";

@Injectable({
    providedIn: 'root'
})
export class VehiclesService implements IVehiclesService {

    constructor(@Inject(VEHICLES_SERVICE) private _vehiclesService: IVehiclesService) {
    }

    getVehiclesList(): Observable<VehicleDataType[]> {
        return this._vehiclesService.getVehiclesList();
    }
    addVehicle(addItem: VehicleDataType): void {
        this._vehiclesService.addVehicle(addItem);
    }
    removeVehicle(item: VehicleDataType): void {
        throw new Error('Method not implemented.');
    }
    editVehicle(item: VehicleDataType): VehicleDataType {
        return this._vehiclesService.editVehicle(item);
    }
}
