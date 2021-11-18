import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs/operators";
import {Observable} from "rxjs";
import {AuthService} from "../../auth/services/auth.service";
import {environment} from "../../../environments/environment";
// @ts-ignore
import packageJson from '../../../../package.json';

@Component({
    selector: 'app-sidemenu-content',
    templateUrl: './sidemenu-content.component.html',
    styleUrls: ['./sidemenu-content.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidemenuContentComponent implements OnInit {

    @Input() menuItems!: {
        label: string,
        icon?: string,
        navigateTo: string
    }[];
    public url: Observable<string>;
    public userData: Observable<any>;
    public version = packageJson.version;

    constructor(private router: Router,
                public authService: AuthService) {
        this.url = router.events.pipe(
            filter((event: any) => event instanceof NavigationEnd),
            map(item => item.url),
        );
        this.userData = this.authService.getUserData();
    }

    ngOnInit(): void {
    }

    navigateToProfile() {
        this.router.navigate(['auth/settings']);
    }
}
