import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {Subscription} from "rxjs";
import {appTheming} from "../../app-common/common";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, OnDestroy {

    @ViewChild('headerDiv') public header: ElementRef;
    private headerSubscription: Subscription;

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.headerSubscription = this.authService.getPersonalSettings().subscribe(() => {
            const primary = window.getComputedStyle(this.header.nativeElement).backgroundColor;
            const secondary = window.getComputedStyle(document.querySelector('.app-title')).color;
            appTheming.primaryColor = primary;
            appTheming.secondaryColor = secondary;
        });
    }

    ngOnDestroy() {
        this.headerSubscription?.unsubscribe();
    }
}
