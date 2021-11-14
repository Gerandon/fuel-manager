import {BaseType} from "./common.interface";

export interface FuelCostDiaryType extends BaseType {
    amountSpent?: number;
    amountPaid?: number;
    fullSpent: number;
    quantity: number;
}
