import {Injectable} from '@angular/core';
import {IAuthService} from "../../app-common/interfaces/auth-service.interface";
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RemoteAuthService implements IAuthService {

    constructor() {
    }

    authenticate(user: any): Observable<boolean> {
        return of();
    }

    isAuthenticated(): Observable<boolean> {
        return of(false);
    }
}
