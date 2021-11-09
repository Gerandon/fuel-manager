import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {VehicleDataType} from "../../../app-common/interfaces/common.interface";
import {VehiclesService} from "../../services/vehicles/vehicles.service";
import {MatDialog} from "@angular/material/dialog";
import {AddTransportTypeDialogComponent} from "../dialogs/add-transport-type-dialog/add-transport-type-dialog.component";
import {Observable} from "rxjs";
import {v4} from "uuid";
import {tap} from "rxjs/operators";

@Component({
    selector: 'app-my-vehicles',
    templateUrl: './my-vehicles.component.html',
    styleUrls: ['./my-vehicles.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MyVehiclesComponent implements OnInit {

    public _vehicles: VehicleDataType[] = [
        { id: '1', brand: 'Honda', type: 'Civic', avgConsumption: 6.6, engineType: 'Gasoline', engineVolume: '1800', creationDate: new Date()},
        { id: '1', brand: 'Honda', type: 'Civic', avgConsumption: 6.6, engineType: 'Gasoline', engineVolume: '1800', creationDate: new Date()},
        { id: '1', brand: 'Honda', type: 'Civic', avgConsumption: 6.6, engineType: 'Gasoline', engineVolume: '1800', creationDate: new Date()},
        { id: '1', brand: 'Honda', type: 'Civic', avgConsumption: 6.6, engineType: 'Gasoline', engineVolume: '1800', creationDate: new Date()},
        { id: '1', brand: 'Honda', type: 'Civic', avgConsumption: 6.6, engineType: 'Gasoline', engineVolume: '1800', creationDate: new Date()},
    ];
    public vehicles!: Observable<VehicleDataType[]>;

    constructor(private vService: VehiclesService,
                private dialog: MatDialog) {
        this.vehicles = vService.getVehiclesList();
    }

    ngOnInit(): void {
    }

    create() {
        this.dialog.open(AddTransportTypeDialogComponent, {
            data: {
                editMode: true
            }
        }).afterClosed().subscribe((data) => {
            if (data) {
                this.vService.addVehicle(data);
            }
        });
    }

    delete(item: VehicleDataType) {
        this.vService.removeVehicle(item);
    }

    setAsMainVehicle(event, item: VehicleDataType) {
        event.preventDefault();
        event.stopPropagation();
        this.vService.editMultiple({
            ownerData: { isMain: false }
        } as VehicleDataType).pipe(
            tap(() => {
                this.vService.editVehicle({
                    ...item,
                    ownerData: {
                        isMain: true,
                    }
                });
            })
        ).subscribe();
    }

    update(item: VehicleDataType) {
        this.dialog.open(AddTransportTypeDialogComponent, {
            data: {
                editMode: true,
                model: item,
            }
        }).afterClosed().subscribe((data) => {
            if (data) {
                this.vService.editVehicle(data);
            }
        });
    }
}
