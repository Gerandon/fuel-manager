import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TranslateLoader, TranslateService} from "@ngx-translate/core";
import {
    catchError,
    filter,
    first,
    map,
    skipWhile,
    tap
} from "rxjs/operators";
import {combineLatest, Observable, of, Subscription} from "rxjs";
import {AuthService} from "./auth/services/auth.service";
import {Config, defaultPersonalSettings} from "./app-common/common";
import {NavigationStart, Router} from "@angular/router";
import {PersonalSettingsType} from "./app-common/interfaces/common.interface";
import {SidebarContainer} from "ng-sidebar";
import {_} from "./app-common/vendor/vendor.module";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    @ViewChild(SidebarContainer) sidebarContainer: SidebarContainer;

    public title = 'fuel-manager';
    public _opened: boolean = false;
    public animated: boolean = false;
    public isAuthenticated: Observable<boolean>;
    public menu = Config.menu.filter(item => item.showAsMenu);
    public backgroundColor = '';
    public personalSettingsHolder: PersonalSettingsType = _.clone(defaultPersonalSettings);

    private routingChangedSubscription!: Subscription;
    private persSettSubscription: Subscription;

    constructor(private translate: TranslateService,
                private translateLoader: TranslateLoader,
                private authService: AuthService,
                private router: Router) {
        this.isAuthenticated = authService.isAuthenticated();
    }

    ngOnInit() {
        // FIXME
        // Subscribe to settingsChange only if authenticated
        // initialize other fbService of AuthService
        // Further info on RemoteAuthService.initOtherServices
        this.isAuthenticated.pipe(
            skipWhile((authed) => !authed),
            first(),
            tap(() => {
                this.authService.initOtherServices();
                this.initSettingsChangeSubscription();
            }),
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

    initSettingsChangeSubscription() {
        this.persSettSubscription = combineLatest([
            this.authService.getPersonalSettings(),
            this.isAuthenticated
        ]).pipe(
            tap(([settings, authed]) => {
                if (authed) {
                    if (settings) {
                        if (settings.backgroundColor !== this.personalSettingsHolder?.backgroundColor) {
                            this.backgroundColor = settings.backgroundColor;
                        }
                        if (settings.theme !== this.personalSettingsHolder?.theme) {
                            document.documentElement.classList.remove('brownish-theme');
                            if (settings?.theme) {
                                document.documentElement.classList.add(settings.theme);
                            }
                        }
                        this.personalSettingsHolder = settings;
                    } else {
                        this.authService.setPersonalSettings(_.clone(defaultPersonalSettings));
                    }
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
