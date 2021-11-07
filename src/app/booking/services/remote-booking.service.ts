import {Injectable} from '@angular/core';
import {IBookingService} from "../../app-common/interfaces/booking-service.interface";
import {Observable} from "rxjs";
import {FuelCostDiaryType, TravelDiaryType} from "../../app-common/interfaces/common.interface";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {lodash as _} from 'src/app/app-common/vendor/vendor.module';
import {FirebaseDatabaseService} from "../../app-common/services/firebase-database.service";

@Injectable({
    providedIn: 'root',
})
export class RemoteBookingService implements IBookingService {

    private travelFbService!: FirebaseDatabaseService<TravelDiaryType>
    private fuelFbService!: FirebaseDatabaseService<FuelCostDiaryType>

    constructor(private firebaseDb: AngularFireDatabase) {
        this.travelFbService = new FirebaseDatabaseService(firebaseDb, 'travel-diary-list');
        this.fuelFbService = new FirebaseDatabaseService(firebaseDb, 'fuel-cost-list');
    }

    addTravelDiary(addItem: TravelDiaryType): void {
        this.travelFbService.create(addItem);
    }

    removeTravelDiary(item: TravelDiaryType): void {
        this.travelFbService.delete(item).subscribe();
    }

    editTravelDiary(item: TravelDiaryType): TravelDiaryType {
        this.travelFbService.update(item).subscribe();
        return item;
    }

    addFuelCost(addItem: FuelCostDiaryType): void {
        this.fuelFbService.create(addItem);
    }

    removeFuelCost(item: FuelCostDiaryType): void {
        throw new Error('Method not implemented.');
    }

    editFuelCost(item: FuelCostDiaryType): FuelCostDiaryType {
        throw new Error('Method not implemented.');
    }

    getTravelDiaryList(): Observable<TravelDiaryType[]> {
        return this.travelFbService.getAll();
    }

    getFuelCostDiaryList(): Observable<FuelCostDiaryType[]> {
        return this.fuelFbService.getAll();
    }
}
