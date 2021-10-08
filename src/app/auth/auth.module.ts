import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './pages/login/login.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {UserSettingsComponent} from './pages/user-settings/user-settings.component';
import {AppCommonModule} from "../app-common/app-common.module";

@NgModule({
    declarations: [
        LoginComponent,
        UserSettingsComponent
    ],
    imports: [
        CommonModule,
        AppCommonModule,
        AuthRoutingModule,
    ],
    exports: []
})
export class AuthModule {
}
