import {Observable} from "rxjs";
import {InjectionToken} from "@angular/core";
import {ServiceReportType, VehicleDataType} from "./vehicle.interface";

export interface IVehiclesService {
    getVehiclesList(): Observable<VehicleDataType[]>;

    getVehicle(id: string): Observable<VehicleDataType>;

    addVehicle(addItem: VehicleDataType): void;

    removeVehicle(item: VehicleDataType): void;

    editVehicle(item: VehicleDataType): VehicleDataType;

    getServiceReports(vehicleId: string): Observable<ServiceReportType[]>;
    addServiceReport(item: ServiceReportType): void;
    removeServiceReport(serviceReportId: string): void;
}

export let VEHICLES_SERVICE = new InjectionToken<IVehiclesService>('IVehiclesService injection token');
