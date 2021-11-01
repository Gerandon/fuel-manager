import {Observable} from "rxjs";
import {InjectionToken} from "@angular/core";
import {UserType} from "./common.interface";

export interface IAuthService {
    authenticate(user?: {username: string, password: string}): Observable<boolean>;
    isAuthenticated(): Observable<boolean>;
    logout(): void;
    getUserData(): Observable<UserType | any>;
}
export let AUTH_SERVICE = new InjectionToken<IAuthService>('IAuthService injection token');
