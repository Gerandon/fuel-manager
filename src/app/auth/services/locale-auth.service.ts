import {Injectable} from '@angular/core';
import {IAuthService} from "../../app-common/interfaces/auth-service.interface";
import {BehaviorSubject, Observable, of} from "rxjs";
import {LocalStorageService, SessionStorage, SessionStorageService} from "ngx-webstorage";
import { PersonalSettingsType } from 'src/app/app-common/interfaces/common.interface';

@Injectable({
    providedIn: 'root'
})
export class LocaleAuthService implements IAuthService {

    @SessionStorage('user')
    private user: any;
    private _isAuthenticated = new BehaviorSubject<boolean>(false);

    constructor(private localStorage: LocalStorageService,
                private sessionStorage: SessionStorageService,) {
        this._isAuthenticated.next(!!this.user);
    }

    getPersonalSettings(): Observable<PersonalSettingsType> {
        throw new Error('Method not implemented.');
    }
    setPersonalSettings(settings: PersonalSettingsType): void {
        throw new Error('Method not implemented.');
    }

    getUserData(): any {
        return of(this.user);
    }

    authenticate({username, password}: any): Observable<boolean> {
        if (!this.user) {
            this.user = {username, password};
        }
        this._isAuthenticated.next(true);
        return of(true);
    }

    isAuthenticated(): Observable<boolean> {
        return this._isAuthenticated.asObservable();
    }

    logout(): void {
        this.sessionStorage.clear('user');
        this._isAuthenticated.next(false);
    }
}
