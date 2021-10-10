import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public user: { username?: string; password?: string; } = {};

    constructor(private router: Router, public authService: AuthService) {
    }

    ngOnInit(): void {
    }

    login() {
        this.authService.authenticate(this.user).pipe(
            tap(() => {
                console.log('bumm');
                this.router.navigate([''])
            })
        ).subscribe();
    }

}
