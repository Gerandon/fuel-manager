import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import * as lodash from 'lodash';
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatListModule} from "@angular/material/list";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import {NgChartsModule} from "ng2-charts";
import {MatSelectModule} from "@angular/material/select";
import {IMaskModule} from "angular-imask";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
import {MatTabsModule} from "@angular/material/tabs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {GoogleMapsModule} from "@angular/google-maps";
import {NgxContentLoadingModule} from "ngx-content-loading";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatRadioModule} from "@angular/material/radio";
import {ColorPickerModule} from "ngx-color-picker";

export const _ = {
    ...lodash,
    set2: (object, prop, value) => lodash.set(object, prop.split('.'), value),
};

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatExpansionModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        FlexLayoutModule,
        MatTableModule,
        MatListModule,
        MatDialogModule,
        MatCheckboxModule,
        MatSelectModule,
        NgChartsModule,
        IMaskModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        MatTooltipModule,
        MatMenuModule,
        MatTabsModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        GoogleMapsModule,
        NgxContentLoadingModule,
        MatRadioModule,
        ColorPickerModule,
    ],
    exports: [
        MatExpansionModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        FlexLayoutModule,
        MatTableModule,
        TranslateModule,
        HttpClientModule,
        MatListModule,
        MatDialogModule,
        MatCheckboxModule,
        MatSelectModule,
        NgChartsModule,
        IMaskModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        MatTooltipModule,
        MatMenuModule,
        MatTabsModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        GoogleMapsModule,
        NgxContentLoadingModule,
        MatRadioModule,
        ColorPickerModule,
    ]
})
export class VendorModule {
}
