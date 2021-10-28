import {Observable} from "rxjs";
import {InjectionToken} from "@angular/core";

export interface IAuthService {
    authenticate(user: {username: string, password: string}): Observable<boolean>;
    isAuthenticated(): Observable<boolean>;
    logout(): void;
}
export let AUTH_SERVICE = new InjectionToken<IAuthService>('IAuthService injection token');
