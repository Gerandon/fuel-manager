export interface RouteFuelPropertiesType {
    id?: string;
    carAvgConsumption: number;
    fuelType: string;
    currentFuelPrice: number;
}
export interface VehicleDataType {
    id?: string;
    brand: string;
    type: string;
    engineType: ('Diesel' | 'Gasoline')
    engineVolume: string;
    avgConsumption: number;
}
export interface FuelCostDiaryType extends BaseType {
    amountSpent?: number;
    amountPaid?: number;
    fullSpent: number;
}
export interface TravelDiaryType extends BaseType {
    distance: number;
    route: RouteType;
    vehicle?: VehicleDataType;
    routeFuelProps?: RouteFuelPropertiesType;
}

export interface UserType {
    username: string;
    password: string;
}

export interface RouteType {
    from?: string;
    to?: string;
    retour?: boolean;
}

interface BaseType {
    id?: string;
    creationDate: Date;
}
