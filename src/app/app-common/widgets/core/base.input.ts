import {ControlValueAccessor, FormControl, NgControl} from "@angular/forms";
import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    InjectFlags,
    Injector,
    Input,
    OnInit,
    ViewChild
} from "@angular/core";
import {FloatLabelType} from "@angular/material/form-field";
import {MatFormFieldAppearance} from "@angular/material/form-field/form-field";
import {TranslateService} from "@ngx-translate/core";

@Directive()
export class BaseInput<T> implements ControlValueAccessor, OnInit {

    @ViewChild('inputElement') inputElement!: ElementRef;
    @ViewChild('input', { static: true }) input!: NgControl;

    @Input() public name!: string;
    @Input() public label!: string;
    @Input() public translateParams?: any;
    @Input() public placeholder?: string;
    @Input() public required?: boolean = false;
    @Input() public disabled?: boolean = false;
    @Input() public floatLabel?: FloatLabelType;
    @Input() public appearance?: MatFormFieldAppearance = 'outline';
    @Input() public icon?: string;
    @Input() public suffix?: string;

    public control!: FormControl;

    protected get valueAccessor(): ControlValueAccessor | null {
        return this.input ? this.input.valueAccessor : null;
    }

    private controlDir?: NgControl;
    private onChange = (value: T) => {};
    private onTouched = () => {};
    private translateService!: TranslateService;

    constructor(protected cdr: ChangeDetectorRef,
                protected injector: Injector) {
        this.translateService = <TranslateService>injector.get(TranslateService, null);
    }

    ngOnInit() {
        // @ts-ignore
        this.controlDir = this.injector.get<NgControl>(NgControl, null, InjectFlags.Optional | InjectFlags.Self);
        this.control = <FormControl>this.controlDir?.control || new FormControl('');
        // For ng-valid expression changed error workaround purposes
        this.cdr.detectChanges();

        if (this.required && !this.translateParams?.field) {
            this.translateParams = {
                ...this.translateParams,
                field: this.translateService.instant(this.label),
            }
        }
    }

    hasError(error: string, input: NgControl = this.controlDir || this.input): boolean {
        return input && input.errors && (input.dirty || input.touched) && input.errors[error];
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
