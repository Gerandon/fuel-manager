import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ApiPageComponent} from "../components/api-page/api-page.component";

const routes: Routes = [
    {
        path: 'api',
        component: ApiPageComponent,
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
export class PublicRoutingModule {
}
