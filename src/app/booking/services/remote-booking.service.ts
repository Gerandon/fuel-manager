import {Injectable} from '@angular/core';
import {IBookingService} from "../../app-common/interfaces/booking-service.interface";
import {Observable} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {FirebaseDatabaseService} from "../../app-common/services/firebase-database.service";
import {TravelDiaryType} from "../../app-common/interfaces/travel-diary.interface";
import {FuelCostDiaryType} from 'src/app/app-common/interfaces/fuel-cost.interface';

@Injectable({
    providedIn: 'root',
})
export class RemoteBookingService implements IBookingService {

    private travelFbService!: FirebaseDatabaseService<TravelDiaryType>;
    private fuelFbService!: FirebaseDatabaseService<FuelCostDiaryType>;

    constructor(private firebaseDb: AngularFireDatabase) {
        this.travelFbService = new FirebaseDatabaseService(firebaseDb, 'travel-diary-list');
        this.fuelFbService = new FirebaseDatabaseService(firebaseDb, 'fuel-cost-list');
    }

    searchInFuelCost(queryParams?: { key: keyof FuelCostDiaryType; value: string; }[]): Observable<FuelCostDiaryType[]> {
        return this.fuelFbService.search(queryParams);
    }

    searchInTravelDiary(queryParams?: { key: keyof TravelDiaryType, value: string }[]): Observable<TravelDiaryType[]> {
        return this.travelFbService.search(queryParams);
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
        this.fuelFbService.delete(item).subscribe();
    }

    editFuelCost(item: FuelCostDiaryType): FuelCostDiaryType {
        this.fuelFbService.update(item).subscribe();
        return item;
    }

    getTravelDiaryList(): Observable<TravelDiaryType[]> {
        return this.travelFbService.getAll('date');
    }

    getFuelCostDiaryList(): Observable<FuelCostDiaryType[]> {
        return this.fuelFbService.getAll('date');
    }
}
