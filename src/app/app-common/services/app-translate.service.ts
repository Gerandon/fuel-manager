import {Inject, Injectable} from '@angular/core';
import {TranslateLoader, TranslateService} from "@ngx-translate/core";
import {catchError, first, map, tap} from "rxjs/operators";
import {of} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {LocalStorage} from "ngx-webstorage";

@Injectable({
    providedIn: 'root'
})
export class AppTranslateService {

    @LocalStorage('lang')
    private storageLang?: string;

    constructor(@Inject(DOCUMENT) private document: Document,
                private translate: TranslateService,
                private translateLoader: TranslateLoader) {
    }

    initializeTranslation(withLang?) {
        const browserLang = navigator.language.split('-')[0];
        const loadedLang = this.storageLang || browserLang;
        const useLang = withLang || loadedLang;
        this.translateLoader.getTranslation(useLang).pipe(
            first(),
            map(() => useLang),
            catchError(() => of('hu')),
            tap((lang) => {
                this.translate.setDefaultLang(lang);
                this.translate.use(lang);
                this.document.documentElement.lang = lang;
                this.storageLang = lang;
            })
        ).subscribe();
    }
}
