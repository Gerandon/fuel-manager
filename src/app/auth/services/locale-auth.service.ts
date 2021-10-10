import {Injectable} from '@angular/core';
import {IAuthService} from "../../app-common/interfaces/auth-service.interface";
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LocaleAuthService implements IAuthService{

    private user: any;

    constructor() {
    }

    authenticate({username, password}: any): Observable<boolean> {
        const sStorageUser = sessionStorage.getItem('user');
        if (sStorageUser) {
            this.user = JSON.parse(sStorageUser);
        } else {
            sessionStorage.setItem('user', JSON.stringify({username, password}))
        }
        return of(true);
    }

    isAuthenticated(): Observable<boolean> {
        return of(!!sessionStorage.getItem('user'));
    }
}
