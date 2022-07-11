import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppCommonModule} from "../app-common/app-common.module";
import {RegularExpensesRoutingModule} from "./router-module/regular-expenses-routing.module";
import {RegularExpensesComponent} from './components/regular-expenses/regular-expenses.component';
import { ExpenseChipsListComponent } from './components/expense-chips-list/expense-chips-list.component';


@NgModule({
    declarations: [
        RegularExpensesComponent,
        ExpenseChipsListComponent
    ],
    imports: [
        CommonModule,
        AppCommonModule,
        RegularExpensesRoutingModule
    ]
})
export class RegularExpensesModule {
}
