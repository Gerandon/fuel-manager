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
export interface BookingListType {
    id?: string;
    date: Date;
    distance: number;
    route?: string;
    amountSpent?: number;
    amountPaid?: number;
    fullSpent: number;
    vehicle?: VehicleDataType;
    routeFuelProps?: RouteFuelPropertiesType;
}
