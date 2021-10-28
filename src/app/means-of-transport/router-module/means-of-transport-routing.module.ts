import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginRequiredGuard} from "../../app-common/guards/login-required.guard";
import {MyVehiclesComponent} from "../components/my-vehicles/my-vehicles.component";

const routes: Routes = [
    {
        path: 'my-vehicles',
        component: MyVehiclesComponent,
        canActivate: [LoginRequiredGuard]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class MeansOfTransportRoutingModule {
}
