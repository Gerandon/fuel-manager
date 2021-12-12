import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable, Subscription} from "rxjs";
import {debounceTime, tap} from "rxjs/operators";
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
    public personalSettings: PersonalSettingsType = _.clone(defaultPersonalSettings);
    private persSettSubscription: Subscription;

    constructor(private authService: AuthService) {
        this.userData = authService.getUserData();
    }

    ngOnInit(): void {
        this.persSettSubscription = this.authService.getPersonalSettings().pipe(
            debounceTime(300),
            tap(settings => {
                if (settings) {
                    this.personalSettings = settings;
                }
            })
        ).subscribe();
    }

    ngOnDestroy() {
        this.persSettSubscription?.unsubscribe();
    }

    public changeSettings({key, value}) {
        this.authService.setPersonalSettings({
            ...this.personalSettings,
            [key]: value,
        });
    }
}
