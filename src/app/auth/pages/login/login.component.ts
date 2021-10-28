import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";
import {SessionStorage} from "ngx-webstorage";
import { isEmpty } from 'traversal-handler';
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public user: { username?: string; password?: string; } = {};
    @SessionStorage('local')
    public useLocally!: boolean;

    constructor(private router: Router,
                public authService: AuthService) {
    }

    ngOnInit(): void {
        if (isEmpty(this.useLocally)) {
            this.useLocally = false;
        }
    }

    login() {
        this.authService.authenticate(this.user).pipe(
            tap(() => {
                this.router.navigate([''])
            })
        ).subscribe();
    }

    changeLocalRemote(event: any) {
        this.useLocally = event;
        window.location.reload();
    }
}
