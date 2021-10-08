import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginRequiredGuard} from "./app-common/guards/login-required.guard";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '',
        canActivate: [/*LoginRequiredGuard*/]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            onSameUrlNavigation: 'reload',
            relativeLinkResolution: 'legacy',
        }),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
