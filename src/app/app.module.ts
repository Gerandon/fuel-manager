import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppCommonModule} from "./app-common/app-common.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LocalStorageService, NgxWebstorageModule, SessionStorageService} from "ngx-webstorage";
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {MissingTranslationService} from "./app-common/services/missing-translations.service";
import {SidebarModule} from "ng-sidebar";
import {MainModule} from "./main/main.module";
import {BOOKING_SERVICE} from "./app-common/interfaces/booking-service.interface";
import {AUTH_SERVICE} from "./app-common/interfaces/auth-service.interface";
import {
    authServiceFactory,
    bookingServiceFactory,
    createTranslateLoader,
    vehiclesServiceFactory
} from "./app-common/common";
import {AuthService} from "./auth/services/auth.service";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabase, AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {environment} from "../environments/environment";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {VEHICLES_SERVICE} from "./app-common/interfaces/vehicles-service.interface";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppCommonModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AppRoutingModule,
        NgxWebstorageModule.forRoot({
            prefix: 'fuel-manager',
            caseSensitive: true,
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
            missingTranslationHandler: {
                provide: MissingTranslationHandler,
                useClass: MissingTranslationService,
            },
        }),
        SidebarModule.forRoot(),
        MainModule,
    ],
    providers: [
        {
            provide: BOOKING_SERVICE,
            useFactory: bookingServiceFactory,
            deps: [SessionStorageService, LocalStorageService, AngularFireDatabase, AuthService]
        },
        {
            provide: AUTH_SERVICE,
            useFactory: authServiceFactory,
            deps: [SessionStorageService, LocalStorageService, AngularFireAuth]
        },
        {
            provide: VEHICLES_SERVICE,
            useFactory: vehiclesServiceFactory,
            deps: [SessionStorageService, LocalStorageService, AngularFireDatabase]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
