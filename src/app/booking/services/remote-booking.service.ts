import {Injectable} from '@angular/core';
import {IBookingService} from "../../app-common/interfaces/booking-service.interface";
import {Observable} from "rxjs";
import {FuelCostDiaryType, TravelDiaryType} from "../../app-common/interfaces/common.interface";
import {first, map, tap} from "rxjs/operators";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {SessionStorage} from "ngx-webstorage";
import { lodash as _ } from 'src/app/app-common/vendor/vendor.module';

@Injectable({
    providedIn: 'root',
})
export class RemoteBookingService implements IBookingService {

    @SessionStorage('uid')
    private uid!: string;

    private travelIdentifierList!: AngularFireList<any>;
    private fuelIdentifierList!: AngularFireList<any>;

    constructor(private firebaseDb: AngularFireDatabase) {
        this.travelIdentifierList = firebaseDb.list(`/travel-diary-list/${this.uid}`);
        this.fuelIdentifierList = firebaseDb.list(`/fuel-cost-list/${this.uid}`);
    }

    addTravelDiary(addItem: TravelDiaryType): void {
        this.travelIdentifierList.push(_.omit({
            ...addItem,
            creationDate: addItem.creationDate.getTime()
        }, ['key']));
    }
    removeTravelDiary(item: TravelDiaryType): void {
        this.travelIdentifierList.snapshotChanges().pipe(
            first(),
            map(changes => changes.map(c =>({ key: c.payload.key, ...c.payload.val() }))),
            tap(items => {
                const removable = items.find(_item => _item.id === item.id);
                if (removable) {
                    this.travelIdentifierList.remove(removable.key);
                }
            })
        ).subscribe();
    }
    editTravelDiary(item: TravelDiaryType): TravelDiaryType {
        this.travelIdentifierList.snapshotChanges().pipe(
            first(),
            map(changes => changes.map(c =>({ key: c.payload.key, ...c.payload.val() }))),
            tap(items => {
                const editable = items.find(_item => _item.id === item.id);
                if (editable) {
                    this.travelIdentifierList.update(editable.key, {
                        ...item,
                        creationDate: item.creationDate.getTime()
                    });
                }
            })
        ).subscribe();
        return item;
    }
    addFuelCost(addItem: FuelCostDiaryType): void {
        this.fuelIdentifierList.push({
            ...addItem,
            creationDate: addItem.creationDate.getTime()
        });
    }
    removeFuelCost(item: FuelCostDiaryType): void {
        throw new Error('Method not implemented.');
    }
    editFuelCost(item: FuelCostDiaryType): FuelCostDiaryType {
        throw new Error('Method not implemented.');
    }

    getTravelDiaryList(): Observable<TravelDiaryType[]> {
        return this.travelIdentifierList.snapshotChanges().pipe(
            map(changes => changes.map(c => ({
                key: c.payload.key,
                ...c.payload.val() ,
                creationDate: new Date(c.payload.val().creationDate)
            })))
        );
    }

    getFuelCostDiaryList(): Observable<FuelCostDiaryType[]> {
        return this.fuelIdentifierList.snapshotChanges().pipe(
            map(changes => changes.map(c => ({
                key: c.payload.key,
                ...c.payload.val() ,
                creationDate: new Date(c.payload.val().creationDate)
            })))
        );
    }
}
