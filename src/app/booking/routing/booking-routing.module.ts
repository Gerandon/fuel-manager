import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginRequiredGuard} from "../../app-common/guards/login-required.guard";
import {BookingListComponent} from "../components/booking-list/booking-list.component";

const routes: Routes = [
    {
        path: 'list',
        component: BookingListComponent,
        canActivate: [LoginRequiredGuard]
    },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class BookingRoutingModule {
}
