import {Observable} from "rxjs";

export interface IAuthService {
    authenticate(user: {username: string, password: string}): Observable<boolean>;
    isAuthenticated(): Observable<boolean>;
}
