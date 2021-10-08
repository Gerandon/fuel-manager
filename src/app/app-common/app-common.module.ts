import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VendorModule} from "./vendor.module";
import {FormsModule} from "@angular/forms";
import {CheckFormDirective} from './directives/check-form.directive';


@NgModule({
    declarations: [
        CheckFormDirective
    ],
    imports: [
        CommonModule,
        VendorModule,
        FormsModule,
    ],
    exports: [
        VendorModule,
        FormsModule,
        CheckFormDirective
    ]
})
export class AppCommonModule {
}
