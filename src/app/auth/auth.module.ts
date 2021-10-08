import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './pages/login/login.component';
import {AuthRoutingModule} from "./auth-routing.module";
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';

@NgModule({
    declarations: [
        LoginComponent,
        UserSettingsComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
    ],
    exports: [
    ]
})
export class AuthModule {
}
