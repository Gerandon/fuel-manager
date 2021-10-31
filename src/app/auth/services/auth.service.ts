import {Inject, Injectable} from '@angular/core';
import {AUTH_SERVICE, IAuthService} from "../../app-common/interfaces/auth-service.interface";
import {Observable} from "rxjs";
import {UserType} from "../../app-common/interfaces/common.interface";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements IAuthService {

    constructor(@Inject(AUTH_SERVICE) private _authService: IAuthService) {
    }

    getUserData(): UserType {
        return this._authService.getUserData();
    }

    authenticate(user: any): Observable<boolean> {
        return this._authService.authenticate(user);
    }

    isAuthenticated(): Observable<boolean> {
        return this._authService.isAuthenticated();
    }

    logout() {
        this._authService.logout();
        window.location.reload();
    }
}
