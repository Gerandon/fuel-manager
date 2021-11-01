import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingRoutingModule} from "./routing/booking-routing.module";
import {BookTravelComponent} from './components/book-travel/book-travel.component';
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {BookingListComponent} from './components/booking-list/booking-list.component';
import {AppCommonModule} from "../app-common/app-common.module";
import {MeansOfTransportModule} from "../means-of-transport/means-of-transport.module";
import { TravelDiaryComponent } from './components/booking-list/travel-diary/travel-diary.component';
import { FuelCostDiaryComponent } from './components/booking-list/fuel-cost-diary/fuel-cost-diary.component';
import { BookFuelComponent } from './components/book-fuel/book-fuel.component';

function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    declarations: [
        BookTravelComponent,
        BookingListComponent,
        TravelDiaryComponent,
        FuelCostDiaryComponent,
        BookFuelComponent
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
