import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingRoutingModule} from "./routing/booking-routing.module";
import {BookMilageComponent} from './components/book-milage/book-milage.component';
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {BookingListComponent} from './components/booking-list/booking-list.component';
import {AppCommonModule} from "../app-common/app-common.module";
import {MeansOfTransportModule} from "../means-of-transport/means-of-transport.module";
import {LocaleBookingService} from "./services/locale-booking.service";
import {BOOKING_SERVICE} from "../app-common/interfaces/booking-service.interface";

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
        MeansOfTransportModule,
    ]
})
export class BookingModule {
}
