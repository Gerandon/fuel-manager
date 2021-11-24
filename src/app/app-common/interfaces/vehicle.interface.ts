import {BaseType} from "./common.interface";

export interface VehicleDataType extends BaseType {
    /** Márka */
    brand: string;
    /** Típus */
    type: string;
    /** Üzemanyag típusa */
    engineType: ('Diesel' | 'Gasoline')
    /** Motor mérete */
    engineVolume: number | null;
    /** Átlag fogyasztás */
    avgConsumption: number | null;
    /** Alvázszám */
    frameNumber?: string;
    /** Motorkód */
    motorCode?: string;
    /** Kilowatt */
    kilowatt?: number;
    /** Gyártási év */
    manufactureDate?: Date;
    /** Tulajdonosi adatok */
    ownerData: OwnerVehicleDataType;
}

export interface OwnerVehicleDataType {
    since?: Date;
    imageUrl?: string;
    isMain?: boolean;
    boughtMilage?: number;
    serviceBook?: any;
}
