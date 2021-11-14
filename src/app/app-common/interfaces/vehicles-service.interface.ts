import {Observable} from "rxjs";
import {InjectionToken} from "@angular/core";
import {VehicleDataType} from "./vehicle.interface";

export interface IVehiclesService {
    getVehiclesList(): Observable<VehicleDataType[]>;

    addVehicle(addItem: VehicleDataType): void;

    removeVehicle(item: VehicleDataType): void;

    editVehicle(item: VehicleDataType): VehicleDataType;
}

export let VEHICLES_SERVICE = new InjectionToken<IVehiclesService>('IVehiclesService injection token');
