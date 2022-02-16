import {ChangeDetectorRef, Component, forwardRef, Injector, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {BaseInput} from "../core/base.input";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true },
    ],
})
export class SelectComponent extends BaseInput<any> implements OnInit {

    @Input() public options!: {label: string, value: any}[];

    constructor(protected injector: Injector,
                protected cdr: ChangeDetectorRef) {
        super(cdr, injector);
    }

    ngOnInit() {
        this.label = this.label || 'COMMON.CHOOSE_OPTION';
        super.ngOnInit();
    }
}
