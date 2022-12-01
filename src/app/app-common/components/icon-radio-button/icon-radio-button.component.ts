import {
    ChangeDetectorRef,
    Component,
    forwardRef,
    Injector,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {BaseInput} from "../../widgets/core/base.input";
import {MatRadioButton} from "@angular/material/radio";
import {NG_ASYNC_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {UnsubscribeOnDestroy} from "../../component-unsubscribe";

@Component({
    selector: 'app-icon-radio-button',
    templateUrl: './icon-radio-button.component.html',
    styleUrls: ['./icon-radio-button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => IconRadioButtonComponent), multi: true },
        { provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => IconRadioButtonComponent), multi: true },
    ],
})
export class IconRadioButtonComponent extends BaseInput<MatRadioButton> implements OnInit {

    @Input() public data: { value: string, icon: string}[];
    public chosen: string;

    @UnsubscribeOnDestroy()
    private controlValueChanges: Observable<any>;

    constructor(protected injector: Injector, protected cdr: ChangeDetectorRef) {
        super(cdr, injector);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.controlValueChanges = this.control.valueChanges;
        this.controlValueChanges.pipe(
            tap(value => {
                let _value = value;
                if (!value) {
                    _value = this.data[0].value;
                     this.chooseButton(_value);
                }
                this.chosen = _value
            })
        ).subscribe();
    }

    public chooseButton(item: any) {
        this.control.setValue(item);
    }
}
