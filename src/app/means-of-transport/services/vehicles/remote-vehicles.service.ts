import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IVehiclesService} from "../../../app-common/interfaces/vehicles-service.interface";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {FirebaseDatabaseService} from "../../../app-common/services/firebase-database.service";
import {VehicleDataType} from "../../../app-common/interfaces/vehicle.interface";

@Injectable({
    providedIn: 'root'
})
export class RemoteVehiclesService implements IVehiclesService {

    private fbService!: FirebaseDatabaseService<VehicleDataType>;

    constructor(private firebaseDb: AngularFireDatabase) {
        this.fbService = new FirebaseDatabaseService(firebaseDb, 'vehicles-list');
    }

    getVehicle(id: string): Observable<VehicleDataType> {
        return this.fbService.get(id);
    }

    getVehiclesList(): Observable<VehicleDataType[]> {
        return this.fbService.getAll();
    }

    addVehicle(addItem: VehicleDataType): void {
        this.fbService.create(addItem);
    }

    removeVehicle(item: VehicleDataType): void {
        this.fbService.delete(item).subscribe();
    }

    editVehicle(item: VehicleDataType): VehicleDataType {
        this.fbService.update(item).subscribe();
        return item;
    }

    editMultiple({property, value}, itemIds?: string[]) {
        return this.fbService.updateMultiple({property, value}, itemIds);
    }
}
