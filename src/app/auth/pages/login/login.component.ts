import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {startWith, tap} from "rxjs/operators";
import {LocalStorageService, SessionStorage} from "ngx-webstorage";
import { isEmpty } from 'traversal-handler';
import {TranslateService} from "@ngx-translate/core";
import {Observable, Subscription} from "rxjs";
import {AppTranslateService} from "../../../app-common/services/app-translate.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    public user: { username?: string; password?: string; } = {};
    @SessionStorage('local')
    public useLocally!: boolean;
    public chosenLanguage = '';

    public functionalities: Observable<{ KEY, VALUE }[]>;

    private langChangeSubscription: Subscription;

    constructor(private router: Router,
                public authService: AuthService,
                public translate: TranslateService,
                private localStorage: LocalStorageService,
                private appTranslate: AppTranslateService) {
    }

    ngOnInit(): void {
        if (isEmpty(this.useLocally)) {
            this.useLocally = false;
        }
        this.chosenLanguage = this.localStorage.retrieve('lang');

        this.langChangeSubscription = this.translate.onLangChange.pipe(
            startWith('en'),
            tap(() => {
                this.functionalities = this.translate.get('MANAGER.FUNCTIONALITIES');
            })
        ).subscribe();
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

    chosenLangChange() {
        this.appTranslate.initializeTranslation(this.chosenLanguage);
    }

    ngOnDestroy() {
        this.langChangeSubscription?.unsubscribe();
    }
}
