import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable, Subscription} from "rxjs";
import {distinctUntilChanged, first, tap} from "rxjs/operators";
import {PersonalSettingsType} from "../../../app-common/interfaces/common.interface";
import {defaultPersonalSettings} from "../../../app-common/common";
import {_} from "../../../app-common/vendor/vendor.module";

@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserSettingsComponent implements OnInit, OnDestroy {

    public userData!: Observable<any>;
    public themeModel = '';
    private personalSettings: PersonalSettingsType;
    private persSettSubscription: Subscription;

    constructor(private authService: AuthService) {
        this.userData = authService.getUserData();
    }

    ngOnInit(): void {
        this.persSettSubscription = this.authService.getPersonalSettings().pipe(
            tap(settings => {
                this.personalSettings = settings;
                this.themeModel = settings?.theme || '';
            })
        ).subscribe();
    }

    ngOnDestroy() {
        this.persSettSubscription?.unsubscribe();
    }

    public changeTheme(event) {
        this.authService.setPersonalSettings({
            ...(this.personalSettings ? {...this.personalSettings} : { ..._.clone(defaultPersonalSettings)}),
            theme: event,
        });
    }
}
