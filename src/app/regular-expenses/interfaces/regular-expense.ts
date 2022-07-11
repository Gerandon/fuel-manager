import {BaseType} from "../../app-common/interfaces/common.interface";

export interface RegularExpense extends BaseType {
    title: string;
    isPaid: boolean;
}
