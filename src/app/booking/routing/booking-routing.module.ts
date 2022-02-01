import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginRequiredGuard} from "../../app-common/guards/login-required.guard";
import {BookTravelComponent} from "../components/book-travel/book-travel.component";
import {BookingListComponent} from "../components/booking-list/booking-list.component";
import {TestComponent} from "../components/test/test.component";

const routes: Routes = [
    {
        path: 'add',
        component: BookTravelComponent,
        canActivate: [LoginRequiredGuard]
    },
    {
        path: 'list',
        component: BookingListComponent,
        canActivate: [LoginRequiredGuard]
    },
    {
        path: 'test',
        component: TestComponent,
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
