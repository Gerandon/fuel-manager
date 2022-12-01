import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {UnsubscribeOnDestroy} from "../component-unsubscribe";

@Directive({
    selector: '[showOnAuthenticated]'
})
export class ShowOnAuthenticatedDirective {

    private hasView = false;
    @Input() public showOnAuthenticated?: (show: boolean) => any;
    @UnsubscribeOnDestroy() private isAuthenticated: Observable<boolean>;

    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef,
                private authService: AuthService) {

        this.isAuthenticated = authService.isAuthenticated();
        this.isAuthenticated.pipe(
            tap((authenticated) => {
                if (authenticated && !this.hasView) {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                    this.hasView = true;
                } else if (this.hasView) {
                    this.viewContainer.clear();
                    this.hasView = false;
                }
                this.showOnAuthenticated && this.showOnAuthenticated(this.hasView);
            })
        ).subscribe();
    }
}
