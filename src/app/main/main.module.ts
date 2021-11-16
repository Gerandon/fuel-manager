import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {AppCommonModule} from "../app-common/app-common.module";
import {SidemenuContentComponent} from './sidemenu-content/sidemenu-content.component';
import {RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [
        HeaderComponent,
        SidemenuContentComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        AppCommonModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        SidemenuContentComponent
    ]
})
export class MainModule {
}
