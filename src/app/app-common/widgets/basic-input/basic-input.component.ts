import {ChangeDetectorRef, Component, forwardRef, Injector, OnInit, ViewEncapsulation} from '@angular/core';
import {BaseInput} from "../core/base.input";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'basic-input',
    templateUrl: './basic-input.component.html',
    styleUrls: ['./basic-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => BasicInputComponent), multi: true },
    ],
})
export class BasicInputComponent extends BaseInput<string> implements OnInit {

    constructor(protected injector: Injector, protected cdr: ChangeDetectorRef) {
        super(cdr, injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }
}
