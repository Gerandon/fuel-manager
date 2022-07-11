import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {LocaleBookingService} from "../booking/services/locale-booking.service";
import {RemoteBookingService} from "../booking/services/remote-booking.service";
import {LocaleAuthService} from "../auth/services/locale-auth.service";
import {RemoteAuthService} from "../auth/services/remote-auth.service";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AuthService} from "../auth/services/auth.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {LocalVehiclesService} from "../means-of-transport/services/vehicles/local-vehicles.service";
import {RemoteVehiclesService} from "../means-of-transport/services/vehicles/remote-vehicles.service";
import {ServiceReportType, VehicleDataType} from "./interfaces/vehicle.interface";
import {_} from "./vendor/vendor.module";
import {IMenu, PersonalSettingsType} from "./interfaces/common.interface";
import {v4} from "uuid";

// src/app/main/header/header.component.ts:25
export const appTheming = {
    primaryColor: '',
    secondaryColor: '',
}

export const fullSizeDialogConfig = {
    height: '90%',
    width: '90%',
    maxWidth: '90%'
}

export interface MaskType {
    mask: RegExp | Function | string | number | Date | MaskType[];
    lazy?: boolean;
    placeholderChar?: string;
    blocks?: any;
    pattern?: string;
    min?: number | Date;
    max?: number | Date;
    parse?: Function;
    format?: Function;
    scale?: number;
    signed?: boolean;
    thousandsSeparator?: string;
    padFractionalZeros?: boolean;
    normalizeZeros?: boolean;
    radix?: string;
    mapToRadix?: string[];
    prepare?: Function;
}

/**
 * FACTORIES
 */
export const createTranslateLoader = (http: HttpClient) => {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
export const bookingServiceFactory = (sStorage: SessionStorageService,
                                      lStorage: LocalStorageService,
                                      db: AngularFireDatabase,
                                      authService: AuthService) => {
    if (sStorage.retrieve('local')) {
        return new LocaleBookingService(lStorage, authService);
    }
    return new RemoteBookingService(db);
}

export const authServiceFactory = (sStorage: SessionStorageService,
                                   lStorage: LocalStorageService,
                                   afAuth: AngularFireAuth,
                                   db: AngularFireDatabase) => {
    if (sStorage.retrieve('local')) {
        return new LocaleAuthService(lStorage, sStorage);
    }
    return new RemoteAuthService(afAuth, db);
}
export const vehiclesServiceFactory = (sStorage: SessionStorageService,
                                       lStorage: LocalStorageService,
                                       db: AngularFireDatabase) => {
    if (sStorage.retrieve('local')) {
        return new LocalVehiclesService();
    }
    return new RemoteVehiclesService(db);
}

export const defaultVehicle: VehicleDataType = {
    id: '0',
    creationDate: new Date(),
    brand: '',
    type: '',
    engineType: 'Gasoline',
    engineVolume: null,
    avgConsumption: null,
    ownerData: {
        imageUrl: '',
    }
}

export const defaultServiceReport: ServiceReportType = {
    id: null,
    creationDate: new Date(),
    vehicleId: null,
    date: new Date(),
    shortDescription: null,
    description: null,
    location: null,
    amount: null,
    milage: null,
    nextSimilarServiceDate: null,
}

export const defaultPersonalSettings: PersonalSettingsType = {
    id: v4(),
    creationDate: new Date(),
    theme: '',
    backgroundColor: null,
    useStaticBackground: true,
}

export const Config: { menu: IMenu[] } = {
    menu: [
        {
            label: 'MENU.PROFILE',
            navigateTo: 'auth/settings',
            showAsTile: true,
            showAsMenu: false,
            imageUrl: '',
            icon: 'person',
        },
        {
            label: 'MENU.STARTING_PAGE',
            navigateTo: 'home',
            showAsTile: false,
            showAsMenu: true,
            imageUrl: '',
        },
        {
            label: 'MENU.VEHICLE_BOOKINGS',
            navigateTo: 'booking/list',
            showAsTile: true,
            showAsMenu: true,
            imageUrl: 'https://kep.cdn.index.hu/1/0/3975/39757/397573/39757307_3033467_cff894add5cbd8a2ad2248bcd9cec88b_wm.jpg',
            icon: 'menu_book'
        },
        {
            label: 'MENU.REGULAR_EXPENSES',
            navigateTo: 'regular-expenses',
            showAsTile: true,
            showAsMenu: true,
            imageUrl: '',
            icon: 'menu_book'
        },
        {
            label: 'MENU.MY_VEHICLES',
            navigateTo: 'means-of-transport/my-vehicles',
            showAsTile: true,
            showAsMenu: true,
            imageUrl: 'https://image.pngaaa.com/84/510084-middle.png',
            icon: 'time_to_leave'
        }
    ]
}

export const filteredMenu = (filterTo: keyof IMenu) => Config.menu
    .filter(item => item[filterTo])
    .map(menu => {
        if (menu.submenu) {
            return {
                ...menu,
                submenu: menu.submenu.filter(item => item[filterTo])
            };
        }
        return menu;
    }) as IMenu[];

/**
 * Modifies given (every) property in any depth
 * @param object
 * @param prop
 * @param newValue
 */
export const modProp = <T extends any>(object: T, prop: keyof T | any, newValue: any) => {
    // @ts-ignore
    return _.transform(object, (acc: any, _value: any, key: keyof T) => {
        if (key === prop) {
            acc[key] = newValue;
        } else if (_.isObject(_value)) {
            acc[key] = modProp(_value, prop, newValue);
        } else {
            acc[key] = _value;
        }
        return acc;
    });
}
