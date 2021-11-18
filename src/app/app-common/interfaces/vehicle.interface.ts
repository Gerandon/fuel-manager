import {BaseType} from "./common.interface";

export interface VehicleDataType extends BaseType {
    brand: string;
    type: string;
    engineType: ('Diesel' | 'Gasoline')
    engineVolume: number | null;
    avgConsumption: number | null;
    ownerData?: OwnerVehicleDataType;
}

export interface OwnerVehicleDataType {
    since?: Date;
    imageUrl?: string;
    isMain?: boolean;
    boughtMilage?: number;
    serviceBook?: any;
}
