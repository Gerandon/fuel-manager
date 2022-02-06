import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {DOCUMENT} from "@angular/common";
import {AppTranslateService} from "./app-common/services/app-translate.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";

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

    constructor(private appTranslate: AppTranslateService,
                private authService: AuthService,
                private router: Router,
                private domSanitizer: DomSanitizer,
                private matIconRegistry: MatIconRegistry) {
        this.isAuthenticated = authService.isAuthenticated();
        this.addCustomIcons();
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

        this.appTranslate.initializeTranslation();

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

    addCustomIcons() {
        const iconsBasePath = 'assets/icons';
        const sanitize = this.domSanitizer.bypassSecurityTrustResourceUrl;
        this.matIconRegistry
            .addSvgIcon('english',sanitize(`${iconsBasePath}/english.svg`));
        this.matIconRegistry
            .addSvgIcon('hungarian',sanitize(`${iconsBasePath}/hungarian.svg`));
    }

    ngOnDestroy() {
        this.routingChangedSubscription?.unsubscribe();
    }
}
