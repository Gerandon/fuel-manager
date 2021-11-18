import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleDataType } from 'src/app/app-common/interfaces/vehicle.interface';
import {IVehiclesService} from "../../../app-common/interfaces/vehicles-service.interface";

@Injectable({
    providedIn: 'root'
})
export class LocalVehiclesService implements IVehiclesService {

    constructor() {
    }

    getVehicle(id: string): Observable<VehicleDataType> {
        throw new Error('Method not implemented.');
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
