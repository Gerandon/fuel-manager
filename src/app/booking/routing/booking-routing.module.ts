import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginRequiredGuard} from "../../app-common/guards/login-required.guard";
import {BookMilageComponent} from "../pages/book-milage/book-milage.component";
import {BookingListComponent} from "../pages/booking-list/booking-list.component";

const routes: Routes = [
    {
        path: 'add',
        component: BookMilageComponent,
        canActivate: [LoginRequiredGuard]
    },
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
