import {Component, OnInit} from '@angular/core';
import {TranslateLoader, TranslateService} from "@ngx-translate/core";
import {catchError, first, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {AuthService} from "./auth/services/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public title = 'fuel-manager';
    public _opened: boolean = false;
    public animated: boolean = false;
    public isAuthenticated: Observable<boolean>;

    constructor(private translate: TranslateService,
                private translateLoader: TranslateLoader,
                private authService: AuthService) {
        this.isAuthenticated = authService.isAuthenticated();
    }

    ngOnInit() {
        const browserLang = navigator.language.split('-')[0];
        const initLang = sessionStorage.getItem('lang') || browserLang;
        this.translateLoader.getTranslation(initLang).pipe(
            first(),
            map(() => initLang),
            catchError(() => of('hu')),
            tap((lang) => {
                const initLang = sessionStorage.getItem('lang') || lang;
                this.translate.setDefaultLang(initLang);
                this.translate.use(initLang);
            })
        ).subscribe();
        this.changeAnimatedState();
    }

    changeAnimatedState() {
        this.animated = false;
        setTimeout(() => {
            console.log('show');
            this.animated = true;
        })
    }

    public _toggleSidebar() {
        this._opened = !this._opened;
    }
}
