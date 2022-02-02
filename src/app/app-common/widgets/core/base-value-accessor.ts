import {
    AbstractControl,
    ControlValueAccessor,
    FormControl,
    NgControl,
    ValidationErrors,
    Validator, ValidatorFn
} from "@angular/forms";
import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    InjectFlags,
    Injector, Input,
    OnInit,
    ViewChild
} from "@angular/core";
import {Observable, of} from "rxjs";
import { _ } from 'src/app/app-common/vendor/vendor.module';

@Directive()
export class BaseValueAccessor<T> implements ControlValueAccessor, OnInit, Validator {

    @ViewChild('inputElement') inputElement!: ElementRef;
    @ViewChild('input', { static: true }) input!: NgControl;
    @Input() public validator: Observable<ValidationErrors> = of({});

    public control!: FormControl;

    protected get valueAccessor(): ControlValueAccessor | null {
        return this.input ? this.input.valueAccessor : null;
    }

    protected controlDir?: NgControl;
    protected readonly _defaultValidate: ValidatorFn = () => null;
    protected _validate: ValidatorFn = this._defaultValidate;

    private onChange = (value: T) => {};
    private onTouched = () => {};

    constructor(protected cdr: ChangeDetectorRef,
                protected injector: Injector) {
    }

    validate(control: AbstractControl): Observable<ValidationErrors> {
        control.setErrors({ ...control.errors, pending: true});
        return this.validator;
    }

    ngOnInit() {
        this.controlDir = this.injector.get<NgControl>(NgControl, null, InjectFlags.Optional | InjectFlags.Self);
        this.control = <FormControl>this.controlDir?.control || new FormControl('');
        // For ng-valid expression changed error workaround purposes
        this.cdr.detectChanges();
    }

    writeValue(obj: T): void {
        this.valueAccessor?.writeValue(obj);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
        this.valueAccessor?.registerOnChange(fn);
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
        this.valueAccessor?.registerOnTouched(fn);
    }
}
