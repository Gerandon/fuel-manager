import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PublicRoutingModule} from "./routing/public-routing.module";
import {ApiPageComponent} from './components/api-page/api-page.component';
import {VendorModule} from "../app-common/vendor/vendor.module";
import { CrudTestRowComponent } from './components/crud-test-row/crud-test-row.component';
import {NgJsonEditorModule} from "ang-jsoneditor";
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        ApiPageComponent,
        CrudTestRowComponent
    ],
    imports: [
        CommonModule,
        VendorModule,
        PublicRoutingModule,
        NgJsonEditorModule,
        FormsModule
    ]
})
export class PublicModule {
}
