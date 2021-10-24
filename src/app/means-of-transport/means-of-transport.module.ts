import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddTransportTypeComponent} from './add-transport-type/add-transport-type.component';
import {AppCommonModule} from "../app-common/app-common.module";
import {VendorModule} from "../app-common/vendor.module";


@NgModule({
    declarations: [
        AddTransportTypeComponent
    ],
    imports: [
        CommonModule,
        AppCommonModule,
    ],
    exports: [
        AddTransportTypeComponent
    ]
})
export class MeansOfTransportModule {
}
