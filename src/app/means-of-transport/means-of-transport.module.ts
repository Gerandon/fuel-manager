import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransportTypeComponent} from './components/transport-type/transport-type.component';
import {AppCommonModule} from "../app-common/app-common.module";
import {MyVehiclesComponent} from './components/my-vehicles/my-vehicles.component';
import {MeansOfTransportRoutingModule} from "./router-module/means-of-transport-routing.module";
import {VehicleTileComponent} from './components/vehicle-tile/vehicle-tile.component';
import { AddTransportTypeDialogComponent } from './components/dialogs/add-transport-type-dialog/add-transport-type-dialog.component';

@NgModule({
    declarations: [
        TransportTypeComponent,
        MyVehiclesComponent,
        VehicleTileComponent,
        AddTransportTypeDialogComponent
    ],
    imports: [
        CommonModule,
        AppCommonModule,
        MeansOfTransportRoutingModule
    ],
    exports: [
        TransportTypeComponent
    ]
})
export class MeansOfTransportModule {
}
