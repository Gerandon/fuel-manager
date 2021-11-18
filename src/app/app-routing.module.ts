import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginRequiredGuard} from "./app-common/guards/login-required.guard";
import {HomeComponent} from "./main/home/home.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [LoginRequiredGuard]
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
        path: 'means-of-transport',
        loadChildren: () => import('./means-of-transport/means-of-transport.module').then(m => m.MeansOfTransportModule)
    },
    {
        path: '**',
        redirectTo: 'home',
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
