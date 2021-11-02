import {Injectable} from '@angular/core';
import {IAuthService} from "../../app-common/interfaces/auth-service.interface";
import {combineLatest, Observable} from "rxjs";
import firebase from "firebase/compat/app";
import auth = firebase.auth;
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";
import {SessionStorage} from "ngx-webstorage";

@Injectable({
    providedIn: 'root'
})
export class RemoteAuthService implements IAuthService {

    @SessionStorage('uid')
    private userId!: string;

    constructor(public afAuth: AngularFireAuth) {
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
