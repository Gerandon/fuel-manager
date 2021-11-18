import {ChangeDetectorRef, Component, forwardRef, Injector, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors} from "@angular/forms";
import {BaseTextInput} from "../core/base-text.input";
import {Observable, of} from "rxjs";

@Component({
    selector: 'basic-input',
    templateUrl: './basic-input.component.html',
    styleUrls: ['./basic-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => BasicInputComponent), multi: true },
        { provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => BasicInputComponent), multi: true },
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
