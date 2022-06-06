import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VendorModule} from "./vendor/vendor.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CheckFormDirective} from './directives/check-form.directive';
import {BasicInputComponent} from './widgets/basic-input/basic-input.component';
import {ShowOnAuthenticatedDirective} from './directives/show-on-authenticated.directive';
import {LineChartComponent} from './components/line-chart/line-chart.component';
import {SelectComponent} from './widgets/select/select.component';
import {NumberInputComponent} from "./widgets/number-input/number-input.component";
import {TriangleButtonComponent} from './widgets/triangle-button/triangle-button.component';
import {WithLoadingPipe} from './pipes/with-loading.pipe';
import {ResolveRequestComponent} from './components/resolve-request/resolve-request.component';
import {MultiLinePipe} from './pipes/multi-line.pipe';
import {ActionsComponent} from './components/actions/actions.component';
import {IconRadioButtonComponent} from './components/icon-radio-button/icon-radio-button.component';
import {CalendarModule} from "./modules/calendar/calendar.module";
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { ConfirmClickDirective } from './directives/confirm-click.directive';
import { ThreeExampleComponent } from './components/three-example/three-example.component';

@NgModule({
    declarations: [
        CheckFormDirective,
        BasicInputComponent,
        ShowOnAuthenticatedDirective,
        LineChartComponent,
        SelectComponent,
        NumberInputComponent,
        TriangleButtonComponent,
        WithLoadingPipe,
        ResolveRequestComponent,
        MultiLinePipe,
        ActionsComponent,
        IconRadioButtonComponent,
        ConfirmDialogComponent,
        ConfirmClickDirective,
        ThreeExampleComponent,
    ],
    imports: [
        CommonModule,
        VendorModule,
        FormsModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'always'})
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
        NumberInputComponent,
        TriangleButtonComponent,
        WithLoadingPipe,
        ResolveRequestComponent,
        MultiLinePipe,
        ActionsComponent,
        IconRadioButtonComponent,
        CalendarModule,
        ConfirmClickDirective,
        ThreeExampleComponent
    ]
})
export class AppCommonModule {
}
