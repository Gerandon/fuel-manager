import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddTransportTypeComponent} from './components/add-transport-type/add-transport-type.component';
import {AppCommonModule} from "../app-common/app-common.module";
import {MyVehiclesComponent} from './components/my-vehicles/my-vehicles.component';
import {MeansOfTransportRoutingModule} from "./router-module/means-of-transport-routing.module";


@NgModule({
    declarations: [
        AddTransportTypeComponent,
        MyVehiclesComponent
    ],
    imports: [
        CommonModule,
        AppCommonModule,
        MeansOfTransportRoutingModule
    ],
    exports: [
        AddTransportTypeComponent
    ]
})
export class MeansOfTransportModule {
}
