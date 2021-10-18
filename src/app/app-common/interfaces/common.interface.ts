export interface RouteFuelPropertiesType {
    carAvgConsumption: number;
    fuelType: string;
    currentFuelPrice: number;
}
export interface CarDataType {
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
    car?: CarDataType;
    routeFuelProps?: RouteFuelPropertiesType;
}
