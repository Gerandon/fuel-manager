import {Component, OnInit} from '@angular/core';
import {MatChip} from "@angular/material/chips";
import {RegularExpense} from "../../interfaces/regular-expense";
import {Validators} from "@angular/forms";

@Component({
    selector: 'app-expense-chips-list',
    templateUrl: './expense-chips-list.component.html',
    styleUrls: ['./expense-chips-list.component.scss']
})
export class ExpenseChipsListComponent implements OnInit {

    public expenses: RegularExpense[] = [
        {
            id: '1',
            title: 'MVM',
            creationDate: new Date(),
            isPaid: false,
        },
        {
            id: '2',
            title: 'MVM - 2',
            creationDate: new Date(),
            isPaid: false
        },
        {
            id: '3',
            title: 'MVM - 3',
            creationDate: new Date(),
            isPaid: false
        },
    ];
    public selectedChipExpense = null;

    constructor() {
        Validators
    }

    ngOnInit(): void {
    }

    onChipRemoved(expense: RegularExpense) {
        this.expenses.splice(this.expenses.indexOf(expense), 1);
    }

    onChipPicked(expense: RegularExpense) {
        console.log(expense);
        this.selectedChipExpense = expense;
    }
}
