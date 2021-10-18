import {
    ChangeDetectorRef,
    Directive,
    Injector, Input,
    OnInit,
} from "@angular/core";
import {BaseInput} from "./base.input";

@Directive()
export class BaseTextInput<T> extends BaseInput<T> implements OnInit {

    @Input() public type: ('text' | 'password') = 'text';

    constructor(protected cdr: ChangeDetectorRef,
                protected injector: Injector) {
        super(cdr, injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }
}
