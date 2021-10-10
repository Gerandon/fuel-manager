import {Component, OnInit} from '@angular/core';
import {TranslateLoader, TranslateService} from "@ngx-translate/core";
import {catchError, first, map, tap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title = 'fuel-manager';

    constructor(private translate: TranslateService, private translateLoader: TranslateLoader) {
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
    }
}
