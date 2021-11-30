import {Inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {IVehiclesService, VEHICLES_SERVICE} from "../../../app-common/interfaces/vehicles-service.interface";
import {ServiceReportType, VehicleDataType} from "../../../app-common/interfaces/vehicle.interface";

@Injectable({
    providedIn: 'root'
})
export class VehiclesService implements IVehiclesService {

    constructor(@Inject(VEHICLES_SERVICE) private _vehiclesService: IVehiclesService) {
    }

    getVehicle(id: string): Observable<VehicleDataType> {
        return this._vehiclesService.getVehicle(id);
    }

    getVehiclesList(): Observable<VehicleDataType[]> {
        return this._vehiclesService.getVehiclesList();
    }
    addVehicle(addItem: VehicleDataType): void {
        this._vehiclesService.addVehicle(addItem);
    }
    removeVehicle(item: VehicleDataType): void {
        this._vehiclesService.removeVehicle(item);
    }
    editVehicle(item: VehicleDataType): VehicleDataType {
        return this._vehiclesService.editVehicle(item);
    }
    editMultiple({property, value}, itemIds?: string[], omitIds?: string[]): Observable<VehicleDataType[]> {
        return this._vehiclesService['editMultiple']({property, value}, itemIds, omitIds);
    }

    addServiceReport(item: ServiceReportType): void {
        this._vehiclesService.addServiceReport(item);
    }

    removeServiceReport(serviceReportId: string): void {
        this._vehiclesService.removeServiceReport(serviceReportId);
    }

    getServiceReports(vehicleId: string): Observable<ServiceReportType[]> {
        return this._vehiclesService.getServiceReports(vehicleId);
    }
}
