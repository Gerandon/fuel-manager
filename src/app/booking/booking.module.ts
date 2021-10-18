import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingRoutingModule} from "./routing/booking-routing.module";
import {BookMilageComponent} from './pages/book-milage/book-milage.component';
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    declarations: [
        BookMilageComponent
    ],
    imports: [
        CommonModule,
        BookingRoutingModule,
    ]
})
export class BookingModule {
}
