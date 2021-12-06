import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateLoader, TranslateService} from "@ngx-translate/core";
import {catchError, filter, first, map, tap} from "rxjs/operators";
import {Observable, of, Subscription} from "rxjs";
import {AuthService} from "./auth/services/auth.service";
import {Config} from "./app-common/common";
import {NavigationStart, Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    public title = 'fuel-manager';
    public _opened: boolean = false;
    public animated: boolean = false;
    public isAuthenticated: Observable<boolean>;
    public menu = Config.menu.filter(item => item.showAsMenu);

    private routingChangedSubscription!: Subscription;
    private persSettSubscription: Subscription;

    constructor(private translate: TranslateService,
                private translateLoader: TranslateLoader,
                private authService: AuthService,
                private router: Router) {
        this.isAuthenticated = authService.isAuthenticated();
    }

    ngOnInit() {
        this.persSettSubscription = this.authService.getPersonalSettings().pipe(
            tap(settings => {
                if (settings) {
                    document.documentElement.classList.remove('brownish-theme');
                    if (settings?.theme) {
                        document.documentElement.classList.add(settings.theme);
                    }
                }
            })
        ).subscribe();

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

        this.routingChangedSubscription = this.router.events.pipe(
            filter((event: any) => event instanceof NavigationStart),
            tap(() => {
                if (this._opened) {
                    this._opened = !this._opened;
                }
            })
        ).subscribe();
    }

    changeAnimatedState() {
        this.animated = false;
        setTimeout(() => {
            this.animated = true;
        })
    }

    public _toggleSidebar() {
        this._opened = !this._opened;
    }

    ngOnDestroy() {
        this.routingChangedSubscription?.unsubscribe();
    }
}
