export interface RouteFuelPropertiesType {
    id?: string;
    carAvgConsumption: number;
    fuelType: string;
    currentFuelPrice: number;
}
export interface OwnerVehicleDataType {
    since?: Date;
    isMain?: boolean;
    boughtMilage?: number;
}
export interface VehicleDataType extends BaseType {
    brand: string;
    type: string;
    engineType: ('Diesel' | 'Gasoline')
    engineVolume: string;
    avgConsumption: number;
    ownerData?: OwnerVehicleDataType;
}
export interface FuelCostDiaryType extends BaseType {
    amountSpent?: number;
    amountPaid?: number;
    fullSpent: number;
    quantity: number;
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
export interface BaseType {
    id?: string;
    creationDate: Date;
}
