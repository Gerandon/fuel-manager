import {ControlValueAccessor, FormControl, NgControl} from "@angular/forms";
import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    InjectFlags,
    Injector,
    OnInit,
    ViewChild
} from "@angular/core";

@Directive()
export class BaseValueAccessor<T> implements ControlValueAccessor, OnInit {

    @ViewChild('inputElement') inputElement!: ElementRef;
    @ViewChild('input', { static: true }) input!: NgControl;

    public control!: FormControl;

    protected get valueAccessor(): ControlValueAccessor | null {
        return this.input ? this.input.valueAccessor : null;
    }

    protected controlDir?: NgControl;
    private onChange = (value: T) => {};
    private onTouched = () => {};

    constructor(protected cdr: ChangeDetectorRef,
                protected injector: Injector) {
    }

    ngOnInit() {
        // @ts-ignore
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
