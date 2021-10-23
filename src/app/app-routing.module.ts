import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginRequiredGuard} from "./app-common/guards/login-required.guard";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'booking/list',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'booking',
        loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule)
    },
    {
        path: '**',
        redirectTo: '',
        canActivate: [LoginRequiredGuard]
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
