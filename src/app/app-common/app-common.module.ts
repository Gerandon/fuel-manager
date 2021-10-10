import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VendorModule} from "./vendor.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CheckFormDirective} from './directives/check-form.directive';
import { BasicInputComponent } from './widgets/basic-input/basic-input.component';


@NgModule({
    declarations: [
        CheckFormDirective,
        BasicInputComponent,
    ],
    imports: [
        CommonModule,
        VendorModule,
        FormsModule,
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'always' }),
    ],
    exports: [
        VendorModule,
        FormsModule,
        ReactiveFormsModule,
        CheckFormDirective,
        BasicInputComponent
    ]
})
export class AppCommonModule {
}
