import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserSettingsComponent implements OnInit {

    public userData!: Observable<any>;

    constructor(private authService: AuthService) {
        this.userData = authService.getUserData();
    }

    ngOnInit(): void {
    }

}
