import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleDataType } from 'src/app/app-common/interfaces/common.interface';
import {IVehiclesService} from "../../../app-common/interfaces/vehicles-service.interface";

@Injectable({
    providedIn: 'root'
})
export class LocalVehiclesService implements IVehiclesService {

    constructor() {
    }

    getVehiclesList(): Observable<VehicleDataType[]> {
        throw new Error('Method not implemented.');
    }
    addVehicle(addItem: VehicleDataType): void {
        throw new Error('Method not implemented.');
    }
    removeVehicle(item: VehicleDataType): void {
        throw new Error('Method not implemented.');
    }
    editVehicle(item: VehicleDataType): VehicleDataType {
        throw new Error('Method not implemented.');
    }
}
