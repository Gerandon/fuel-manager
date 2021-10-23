import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../auth/services/auth.service";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class LogoutRequiredGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.isAuthenticated().pipe(
            map(authenticated => !authenticated)
        );
    }
}