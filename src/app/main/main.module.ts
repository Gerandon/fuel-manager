import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {AppCommonModule} from "../app-common/app-common.module";
import {SidemenuContentComponent} from './sidemenu-content/sidemenu-content.component';
import {RouterModule} from "@angular/router";


@NgModule({
    declarations: [
        HeaderComponent,
        SidemenuContentComponent
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
