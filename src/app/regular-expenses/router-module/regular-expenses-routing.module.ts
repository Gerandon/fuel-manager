import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegularExpensesComponent} from "../components/regular-expenses/regular-expenses.component";
import {LoginRequiredGuard} from "../../app-common/guards/login-required.guard";

const routes: Routes = [
    {
        path: '',
        component: RegularExpensesComponent,
        canActivate: [LoginRequiredGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class RegularExpensesRoutingModule {
}
