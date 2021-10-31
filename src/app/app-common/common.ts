import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {LocaleBookingService} from "../booking/services/locale-booking.service";
import {RemoteBookingService} from "../booking/services/remote-booking.service";
import {LocaleAuthService} from "../auth/services/locale-auth.service";
import {RemoteAuthService} from "../auth/services/remote-auth.service";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AuthService} from "../auth/services/auth.service";

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
                                      authService: AuthService) => {
    if (sStorage.retrieve('local')) {
        return new LocaleBookingService(lStorage, authService);
    }
    return new RemoteBookingService();
}

export const authServiceFactory = (sStorage: SessionStorageService, lStorage: LocalStorageService) => {
    if (sStorage.retrieve('local')) {
        return new LocaleAuthService(lStorage, sStorage);
    }
    return new RemoteAuthService();
}
