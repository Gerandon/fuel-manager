import {VehicleDataType} from "./vehicle.interface";
import {BaseType} from "./common.interface";

export interface TravelDiaryType extends BaseType {
    date: Date;
    distance: number;
    route: RouteType;
    vehicle?: VehicleDataType;
    routeFuelProps?: RouteFuelPropertiesType;
}

export interface RouteFuelPropertiesType {
    id?: string;
    carAvgConsumption: number;
    fuelType: string;
    currentFuelPrice: number;
}

export interface RouteType {
    from?: string;
    to?: string;
    retour?: boolean;
}
