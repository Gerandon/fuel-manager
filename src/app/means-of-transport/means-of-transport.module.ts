import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransportTypeComponent} from './components/transport-type/transport-type.component';
import {AppCommonModule} from "../app-common/app-common.module";
import {MyVehiclesComponent} from './components/my-vehicles/my-vehicles.component';
import {MeansOfTransportRoutingModule} from "./router-module/means-of-transport-routing.module";
import {VehicleTileComponent} from './components/vehicle-tile/vehicle-tile.component';
import { AddTransportTypeDialogComponent } from './components/dialogs/add-transport-type-dialog/add-transport-type-dialog.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';
import { TrafficLicenseComponent } from './components/traffic-license/traffic-license.component';
import { AddServiceReportComponent } from './components/dialogs/add-service-report/add-service-report.component';

@NgModule({
    declarations: [
        TransportTypeComponent,
        MyVehiclesComponent,
        VehicleTileComponent,
        AddTransportTypeDialogComponent,
        VehicleDetailComponent,
        TrafficLicenseComponent,
        AddServiceReportComponent
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
