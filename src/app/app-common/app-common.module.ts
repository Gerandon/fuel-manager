import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VendorModule} from "./vendor.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CheckFormDirective} from './directives/check-form.directive';
import { BasicInputComponent } from './widgets/basic-input/basic-input.component';
import { ShowOnAuthenticatedDirective } from './directives/show-on-authenticated.directive';


@NgModule({
    declarations: [
        CheckFormDirective,
        BasicInputComponent,
        ShowOnAuthenticatedDirective,
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
        BasicInputComponent,
        ShowOnAuthenticatedDirective
    ]
})
export class AppCommonModule {
}
