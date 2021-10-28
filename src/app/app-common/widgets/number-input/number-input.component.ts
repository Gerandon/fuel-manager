import {ChangeDetectorRef, Component, forwardRef, Injector, Input, OnInit, ViewEncapsulation,} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {BaseInput} from "../core/base.input";
import {MaskType} from "../../common";

@Component({
    selector: 'number-input',
    templateUrl: './number-input.component.html',
    styleUrls: ['./number-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NumberInputComponent),
            multi: true,
        },
    ],
})
export class NumberInputComponent extends BaseInput<Number> implements OnInit {

    @Input() customImask?: MaskType;
    @Input() maxLength: number = 6;
    @Input() unmask: boolean | 'typed' = 'typed';
    @Input() minExclusive = false;
    @Input() maxExclusive = false;

    private readonly defaultIMask: MaskType = {
        mask: Number,
        max: 999999,
        scale: 4,
        radix: ',',
        thousandsSeparator: ' ',
    };

    constructor(protected injector: Injector,
                protected cdr: ChangeDetectorRef) {
        super(cdr, injector);
    }

    ngOnInit(): void {
        if (this.customImask) {
            this.customImask = {
                ...this.customImask,
                mask: Number, // Mindig Number típusú legyen
                radix: ',',
            };
        } else {
            this.customImask = this.defaultIMask;
        }
        super.ngOnInit();
    }

    /*validate({ value }: FormControl) {
        let error = null;
        if (this.required && !value) {
            error = { required: true };
        } else {
            const bigNumber = new BigNumber(value);
            const maxComparator = !this.maxExclusive ?
                'isGreaterThan' : 'isGreaterThanOrEqualTo';
            const minComparator = !this.minExclusive ?
                'isLessThan' : 'isLessThanOrEqualTo';

            if (this.customImask?.max && bigNumber[maxComparator](<BigNumber>this.customImask.max)) {
                error = { max: true };
            } else if (this.customImask?.min && bigNumber[minComparator](<BigNumber>this.customImask.min)) {
                error = { min: true };
            }
        }
        return error;
    }*/

}
