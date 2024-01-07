import {Component, OnInit, ViewChild} from '@angular/core';
import {
    filter,
    first,
    skipWhile,
    tap
} from "rxjs/operators";
import {combineLatest, Observable} from "rxjs";
import {AuthService} from "./auth/services/auth.service";
import {defaultPersonalSettings, filteredMenu} from "./app-common/common";
import {Event, NavigationStart, Router} from "@angular/router";
import {IMenu, PersonalSettingsType} from "./app-common/interfaces/common.interface";
import {SidebarContainer} from "ng-sidebar-v2";
import {_} from "./app-common/vendor/vendor.module";
import {AppTranslateService} from "./app-common/services/app-translate.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";
import {UnsubscribeOnDestroy} from "./app-common/component-unsubscribe";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @ViewChild(SidebarContainer) sidebarContainer: SidebarContainer;

    public title = 'fuel-manager';
    public _opened: boolean = false;
    public animated: boolean = false;
    @UnsubscribeOnDestroy() public isAuthenticated: Observable<boolean>;
    public menu: IMenu[];
    public backgroundColor = '';
    public personalSettingsHolder: PersonalSettingsType = _.clone(defaultPersonalSettings);

    @UnsubscribeOnDestroy() private routerEvents$: Observable<Event>;
    @UnsubscribeOnDestroy() private personalSettings$: Observable<any>;

    constructor(private appTranslate: AppTranslateService,
                private authService: AuthService,
                private router: Router,
                private domSanitizer: DomSanitizer,
                private matIconRegistry: MatIconRegistry) {
        this.menu = filteredMenu('showAsMenu');
        this.isAuthenticated = authService.isAuthenticated();
        this.routerEvents$ = router.events;
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

        this.routerEvents$.pipe(
            filter((event: any) => event instanceof NavigationStart),
            tap(() => {
                if (this._opened) {
                    this._opened = !this._opened;
                }
            })
        ).subscribe();
    }

    initSettingsChangeSubscription() {
        this.personalSettings$ = combineLatest([
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
        );
        this.personalSettings$.subscribe();
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
}
