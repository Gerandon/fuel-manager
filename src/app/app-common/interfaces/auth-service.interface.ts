import {Observable} from "rxjs";
import {InjectionToken} from "@angular/core";
import {PersonalSettingsType, UserType} from "./common.interface";
import {LoginDataType} from "./user.interface";

export interface IAuthService {
    authenticate(user?: LoginDataType): Observable<boolean>;
    isAuthenticated(): Observable<boolean>;
    logout(): void;
    getUserData(): Observable<UserType | any>;

    getPersonalSettings(): Observable<PersonalSettingsType>;
    setPersonalSettings(settings: PersonalSettingsType): void;
}
export let AUTH_SERVICE = new InjectionToken<IAuthService>('IAuthService injection token');
