import {TravelDiaryType} from "./travel-diary.interface";
import {FuelCostDiaryType} from "./fuel-cost.interface";

export interface PersonalSettingsType extends BaseType {
    theme: string;
    backgroundColor: string;
    useStaticBackground: boolean;
}

export interface UserType {
    username: string;
    password: string;
}

export interface BaseType {
    id: string;
    creationDate: Date;
    modificationDate?: Date;
    date?: Date;
}

export interface IMenu {
    label: string;
    navigateTo: string;
    showAsTile: boolean;
    showAsMenu: boolean;
    imageUrl: string;
    icon?: string;
    submenu?: IMenu[];
    disabled?: string;
}

export type BookingListType = TravelDiaryType | FuelCostDiaryType;
