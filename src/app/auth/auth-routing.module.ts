import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./pages/login/login.component";
import {UserSettingsComponent} from "./pages/user-settings/user-settings.component";
import {LoginRequiredGuard} from "../app-common/guards/login-required.guard";
import {LogoutRequiredGuard} from "../app-common/guards/logout-required.guard";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LogoutRequiredGuard]
    },
    {
        path: 'settings',
        component: UserSettingsComponent,
        canActivate: [LoginRequiredGuard]
    }
];

@NgModule({
  declarations: [],
  imports: [
      CommonModule,
      RouterModule.forRoot(routes, {
          onSameUrlNavigation: 'reload',
          relativeLinkResolution: 'legacy',
      }),
  ]
})
export class AuthRoutingModule { }
