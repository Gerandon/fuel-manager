import {BaseType} from "./common.interface";

export interface VehicleDataType extends BaseType {
    brand: string;
    type: string;
    engineType: ('Diesel' | 'Gasoline')
    engineVolume: string;
    avgConsumption: number;
    ownerData?: OwnerVehicleDataType;
}

export interface OwnerVehicleDataType {
    since?: Date;
    isMain?: boolean;
    boughtMilage?: number;
    serviceBook?: any;
}
