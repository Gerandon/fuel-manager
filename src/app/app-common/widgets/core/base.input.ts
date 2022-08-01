import {NgControl} from "@angular/forms";
import {
    ChangeDetectorRef,
    Directive,
    Injector,
    Input,
    OnInit,
} from "@angular/core";
import {FloatLabelType, MatFormFieldAppearance} from "@angular/material/form-field";
import {TranslateService} from "@ngx-translate/core";
import {BaseValueAccessor} from "./base-value-accessor";

@Directive()
export class BaseInput<T> extends BaseValueAccessor<T> implements OnInit {

    @Input() public name!: string;
    @Input() public label!: string;
    @Input() public translateParams?: any;
    @Input() public placeholder?: string = this.label;
    @Input() public required?: boolean = false;
    @Input() public disabled?: boolean = false;
    @Input() public floatLabel?: FloatLabelType;
    @Input() public appearance?: MatFormFieldAppearance = 'outline';
    @Input() public icon?: string;
    @Input() public suffix?: string;

    private translateService!: TranslateService;

    constructor(protected cdr: ChangeDetectorRef,
                protected injector: Injector) {
        super(cdr, injector);
        this.translateService = <TranslateService>injector.get(TranslateService, null);
    }

    ngOnInit() {
        super.ngOnInit();

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
}
