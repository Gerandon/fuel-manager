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
}

export interface ServiceReportType extends BaseType {
    /** Jármű azonosítója */
    vehicleId: string;
    /** Szervíz időpontja */
    date: Date;
    /** Rövid leírás */
    shortDescription: string;
    /** Leírás */
    description?: string;
    /** Összeg */
    amount: number;
    /** Helyszín */
    location: string;
}
