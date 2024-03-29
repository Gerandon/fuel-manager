import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {VehiclesService} from "../../services/vehicles/vehicles.service";
import {MatDialog} from "@angular/material/dialog";
import {AddTransportTypeDialogComponent} from "../dialogs/add-transport-type-dialog/add-transport-type-dialog.component";
import {Observable} from "rxjs";
import { VehicleDataType } from 'src/app/app-common/interfaces/vehicle.interface';
import {_} from "../../../app-common/vendor/vendor.module";
import {first, tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
    selector: 'app-my-vehicles',
    templateUrl: './my-vehicles.component.html',
    styleUrls: ['./my-vehicles.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MyVehiclesComponent implements OnInit {

    public trackByIdentity = (index: number, item: any) => item;
    public vehicles!: Observable<VehicleDataType[]>;

    constructor(private vService: VehiclesService,
                private dialog: MatDialog,
                private router: Router) {
        this.vehicles = vService.getVehiclesList();
    }

    ngOnInit(): void {
    }

    showDetail(item: VehicleDataType) {
        this.router.navigate([`/means-of-transport/vehicle/${item.id}`])
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
        this.vService.editMultiple({property: 'ownerData.isMain', value: false}, [], [item.id]).pipe(
            first(),
        ).subscribe(() => {
            this.vService.editVehicle(_.set2(item, 'ownerData.isMain', !item.ownerData?.isMain));
        });
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
