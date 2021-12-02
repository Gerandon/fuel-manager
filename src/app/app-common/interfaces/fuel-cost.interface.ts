import {BaseType} from "./common.interface";

export interface FuelCostDiaryType extends BaseType {
    date: Date;
    amountSpent?: number;
    amountPaid?: number;
    fullSpent: number;
    quantity: number;
}
