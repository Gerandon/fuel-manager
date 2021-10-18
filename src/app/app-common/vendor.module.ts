import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatExpansionModule} from "@angular/material/expansion";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import * as _ from 'lodash';
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";

export const lodash = _;

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
    ],
    exports: [
        MatExpansionModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        FlexLayoutModule,
        TranslateModule,
        HttpClientModule,
    ]
})
export class VendorModule {
}
