import {ChangeDetectorRef, Component, forwardRef, Injector, OnInit, ViewEncapsulation} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseTextInput} from "../core/base-text.input";

@Component({
    selector: 'basic-input',
    templateUrl: './basic-input.component.html',
    styleUrls: ['./basic-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => BasicInputComponent), multi: true },
    ],
})
export class BasicInputComponent extends BaseTextInput<string> implements OnInit {

    constructor(protected injector: Injector, protected cdr: ChangeDetectorRef) {
        super(cdr, injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }
}
