import {Injectable} from '@angular/core';
import {IAuthService} from "../../app-common/interfaces/auth-service.interface";
import {Observable, of} from "rxjs";
import {UserType} from "../../app-common/interfaces/common.interface";

@Injectable({
    providedIn: 'root'
})
export class RemoteAuthService implements IAuthService {

    constructor() {
    }

    getUserData(): UserType {
        throw new Error('Method not implemented.');
    }

    authenticate(user: any): Observable<boolean> {
        return of();
    }

    isAuthenticated(): Observable<boolean> {
        return of(false);
    }

    logout(): void {
    }
}
