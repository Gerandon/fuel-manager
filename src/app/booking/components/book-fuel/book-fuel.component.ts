import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FuelCostDiaryType} from "../../../app-common/interfaces/fuel-cost.interface";
import {_} from 'src/app/app-common/vendor/vendor.module';

@Component({
    selector: 'app-book-fuel',
    templateUrl: './book-fuel.component.html',
    styleUrls: ['./book-fuel.component.scss']
})
export class BookFuelComponent implements OnInit {

    public editable: boolean = true;
    public isNew: boolean = false;
    public model!: FuelCostDiaryType;
    public currentFuelCost: number = 479;

    constructor(@Inject(MAT_DIALOG_DATA) private item: {model: any, editMode: boolean}) {
    }

    ngOnInit(): void {
        this.isNew = !this.item?.model;
        this.model = <FuelCostDiaryType>_.omit(this.item?.model || {
            date: new Date(),
            amountPaid: 0,
        }, 'fullSpent');
        this.model.fullSpent = 0; // Forcing calculation
        this.editable = !!this.item?.editMode;
        this.calculateFullSpent();
    }

    calculateFullSpent() {
        const { amountSpent, amountPaid } = this.model;
        this.model.fullSpent = (amountSpent || 0) - (amountPaid || 0);
    }

    calculateAmountSpentQuantity() {
        if (this.currentFuelCost) {
            this.model.amountSpent = this.model.quantity * this.currentFuelCost;
        }
        this.calculateFullSpent();
    }

    calculateQuantityByPaid() {
        if (this.currentFuelCost) {
            this.model.quantity = this.model.amountSpent / this.currentFuelCost;
        }
        this.calculateFullSpent();
    }
}

