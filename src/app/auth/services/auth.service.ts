import {Injectable} from '@angular/core';
import {LocaleAuthService} from "./locale-auth.service";
import {RemoteAuthService} from "./remote-auth.service";
import {IAuthService} from "../../app-common/interfaces/auth-service.interface";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements IAuthService {

    private _authService!: IAuthService;

    constructor(private localService: LocaleAuthService,
                private remoteService: RemoteAuthService) {
        this._authService = !environment.remote ? localService : remoteService;
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
