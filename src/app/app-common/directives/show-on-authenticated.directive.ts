import {Directive, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {tap} from "rxjs/operators";
import {Subscription} from "rxjs";

@Directive({
    selector: '[showOnAuthenticated]'
})
export class ShowOnAuthenticatedDirective implements OnDestroy {

    private hasView = false;
    private subscription!: Subscription;

    @Input() public showOnAuthenticated?: (show: boolean) => any;

    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef,
                private authService: AuthService) {

        this.subscription = authService.isAuthenticated().pipe(
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

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
