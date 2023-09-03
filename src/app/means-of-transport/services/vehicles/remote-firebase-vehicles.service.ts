import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IVehiclesService} from "../../../app-common/interfaces/vehicles-service.interface";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {FirebaseDatabaseService} from "../../../app-common/services/firebase-database.service";
import {ServiceReportType, VehicleDataType} from "../../../app-common/interfaces/vehicle.interface";

enum Services {
    vehicleList = 'vehicles-list',
    serviceReportList = 'service-report-list'
}

@Injectable({
    providedIn: 'root'
})
export class RemoteFirebaseVehiclesService implements IVehiclesService {

    private fbVehicleService!: FirebaseDatabaseService<VehicleDataType>;

    constructor(private firebaseDb: AngularFireDatabase) {
        this.fbVehicleService = new FirebaseDatabaseService(firebaseDb, Services.vehicleList);
    }

    getVehicle(id: string): Observable<VehicleDataType> {
        return this.fbVehicleService.get(id);
    }

    getVehiclesList(): Observable<VehicleDataType[]> {
        return this.fbVehicleService.getAll();
    }

    addVehicle(addItem: VehicleDataType): void {
        this.fbVehicleService.create(addItem);
    }

    removeVehicle(item: VehicleDataType): void {
        this.fbVehicleService.delete(item).subscribe();
        const srService: FirebaseDatabaseService<ServiceReportType> =
            new FirebaseDatabaseService(this.firebaseDb, `${Services.serviceReportList}/${item.id}`);
        srService.deleteAll();
    }

    editVehicle(item: VehicleDataType): VehicleDataType {
        this.fbVehicleService.update(item).subscribe();
        return item;
    }

    editMultiple({property, value}, itemIds?: string[], omitIds?: string[]) {
        return this.fbVehicleService.updateMultiple({property, value}, itemIds, omitIds);
    }

    addServiceReport(item: ServiceReportType): void {
        const srService = new FirebaseDatabaseService(this.firebaseDb, `${Services.serviceReportList}/${item.vehicleId}`);
        srService.create(item);
    }

    removeServiceReport(serviceReportId: string): void {
    }

    getServiceReports(vehicleId: string): Observable<ServiceReportType[]> {
        const srService: FirebaseDatabaseService<ServiceReportType> =
            new FirebaseDatabaseService(this.firebaseDb, `${Services.serviceReportList}/${vehicleId}`);
        return srService.getAll();
    }
}
