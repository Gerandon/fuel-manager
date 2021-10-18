import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingRoutingModule} from "./routing/booking-routing.module";
import {BookMilageComponent} from './pages/book-milage/book-milage.component';
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {BookingListComponent} from './pages/booking-list/booking-list.component';
import {AppCommonModule} from "../app-common/app-common.module";

function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    declarations: [
        BookMilageComponent,
        BookingListComponent
    ],
    imports: [
        CommonModule,
        AppCommonModule,
        BookingRoutingModule,
        TranslateModule.forChild({
            loader: {provide: TranslateLoader, useFactory: (createTranslateLoader), deps: [HttpClient]}
        }),
    ]
})
export class BookingModule {
}
