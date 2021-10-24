import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VendorModule} from "./vendor.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CheckFormDirective} from './directives/check-form.directive';
import {BasicInputComponent} from './widgets/basic-input/basic-input.component';
import {ShowOnAuthenticatedDirective} from './directives/show-on-authenticated.directive';
import {LineChartComponent} from './components/line-chart/line-chart.component';
import { SelectComponent } from './widgets/select/select.component';
import {NumberInputComponent} from "./widgets/number-input/number-input.component";


@NgModule({
    declarations: [
        CheckFormDirective,
        BasicInputComponent,
        ShowOnAuthenticatedDirective,
        LineChartComponent,
        SelectComponent,
        NumberInputComponent,
    ],
    imports: [
        CommonModule,
        VendorModule,
        FormsModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'always'}),
    ],
    exports: [
        VendorModule,
        FormsModule,
        ReactiveFormsModule,
        CheckFormDirective,
        BasicInputComponent,
        SelectComponent,
        ShowOnAuthenticatedDirective,
        LineChartComponent,
        NumberInputComponent
    ]
})
export class AppCommonModule {
}
