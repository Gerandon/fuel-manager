import {Injectable} from '@angular/core';
import {IAuthService} from "../../app-common/interfaces/auth-service.interface";
import {combineLatest, Observable, of} from "rxjs";
import firebase from "firebase/compat/app";
import auth = firebase.auth;
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {first, map, tap} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";
import {SessionStorage} from "ngx-webstorage";
import { PersonalSettingsType } from 'src/app/app-common/interfaces/common.interface';
import {FirebaseDatabaseService} from "../../app-common/services/firebase-database.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {defaultPersonalSettings} from "../../app-common/common";
import {_} from "../../app-common/vendor/vendor.module";

@Injectable({
    providedIn: 'root'
})
export class RemoteAuthService implements IAuthService {

    @SessionStorage('uid')
    private userId!: string;

    private personalSettingsFbService!: FirebaseDatabaseService<PersonalSettingsType>;

    constructor(public afAuth: AngularFireAuth,
                private firebaseDb: AngularFireDatabase) {
        this.personalSettingsFbService = new FirebaseDatabaseService(firebaseDb, 'personal-settings');
    }

    getPersonalSettings(): Observable<PersonalSettingsType> {
        return this.personalSettingsFbService.first();
    }
    setPersonalSettings(settings: PersonalSettingsType): void {
        this.getPersonalSettings().pipe(
            first(),
            tap((first) => {
                if (first) {
                    this.personalSettingsFbService.update(settings);
                } else {
                    this.personalSettingsFbService.create(settings);
                }
            })
        ).subscribe();
    }

    // Auth logic to run auth providers
    authLogin(): Promise<any> {
        return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    getUserData(): any {
        return this.afAuth.user.pipe(map((user:any) => user?._delegate));
    }

    authenticate(): Observable<boolean> {
        return fromPromise(this.authLogin());
    }

    isAuthenticated(): Observable<boolean> {
        return combineLatest([
            this.getUserData(),
            this.afAuth.authState.pipe(map(item => !!item))
        ]).pipe(
            map(([userData, authenticated]) => {
                this.userId = (<any>userData)?.uid;
                return authenticated;
            })
        );
    }

    logout(): void {
        this.afAuth.signOut();
    }
}
