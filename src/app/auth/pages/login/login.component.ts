import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";
import {SessionStorage} from "ngx-webstorage";
import { isEmpty } from 'traversal-handler';
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public user: { username?: string; password?: string; } = {};
    @SessionStorage('local')
    public useLocally!: boolean;

    public functionalities: Observable<{ KEY, VALUE }[]>;

    constructor(private router: Router,
                public authService: AuthService,
                public translate: TranslateService) {
    }

    ngOnInit(): void {
        if (isEmpty(this.useLocally)) {
            this.useLocally = false;
        }

        this.functionalities = this.translate.get('MANAGER.FUNCTIONALITIES');
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
