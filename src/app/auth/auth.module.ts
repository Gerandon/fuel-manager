import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './pages/login/login.component';
import {AuthRoutingModule} from "./routing/auth-routing.module";
import {UserSettingsComponent} from './pages/user-settings/user-settings.component';
import {AppCommonModule} from "../app-common/app-common.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    declarations: [
        LoginComponent,
        UserSettingsComponent
    ],
    imports: [
        CommonModule,
        AppCommonModule,
        AuthRoutingModule,
        TranslateModule.forChild({
            loader: { provide: TranslateLoader, useFactory: (createTranslateLoader), deps: [HttpClient] }
        }),
    ],
    exports: []
})
export class AuthModule {
}
