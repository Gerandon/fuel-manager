import {Observable} from "rxjs";
import {InjectionToken} from "@angular/core";
import {UserType} from "./common.interface";
import {LoginDataType} from "./user.interface";

export interface IAuthService {
    authenticate(user?: LoginDataType): Observable<boolean>;
    isAuthenticated(): Observable<boolean>;
    logout(): void;
    getUserData(): Observable<UserType | any>;

    //getTheme(): any;
    //setTheme(): void;
}
export let AUTH_SERVICE = new InjectionToken<IAuthService>('IAuthService injection token');
