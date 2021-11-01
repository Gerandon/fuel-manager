import {
    ChangeDetectorRef,
    Directive,
    DoCheck,
    Host,
    Input,
    OnInit,
} from '@angular/core';
import { FormControl, FormGroup, NgForm, ValidationErrors } from '@angular/forms';
import { lodash as _ } from 'src/app/app-common/vendor/vendor.module';

@Directive({
    selector: 'form[appCheckForm]',
})
export class CheckFormDirective implements OnInit, DoCheck {

    /**
     * Külön Opcionális input, osztály szintű CDR átadáshoz
     */
    @Input() inputCdr?: ChangeDetectorRef;
    @Input() boFormGroup?: FormGroup;

    private _cdr!: ChangeDetectorRef;

    private lastControlsState!: {
        controls: string[],
        errors: (ValidationErrors | null)[],
        controlStatuses: string[]
    };

    constructor(@Host() private form: NgForm,
                private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this._cdr = this.inputCdr || this.cdr;
    }

    /**
     * Form ellenorzese: a metodus rekurzivan vegigmegy a form osszes komponensen,
     * majd megjeloli dirty/touched allapotra, amennyiben nem a kotelezoseg validacioja az egyetlen hiba.
     */
    private checkForm() {
        const markFields = (form: FormGroup | NgForm) => {
            _.forEach(form.controls, (control) => {
                if (control instanceof FormControl) {
                    if (control.errors && !(_.size(control.errors) === 1 && (control.errors['required'] && !control.dirty))) {
                        control.markAsDirty();
                        control.markAsTouched();
                    }
                } else if (control instanceof FormGroup) {
                    markFields(control);
                }
            });
        };

        markFields(this.getForm());
        this._cdr.markForCheck();
    }

    getForm(): NgForm | FormGroup {
        return this.boFormGroup || this.form;
    }

    ngDoCheck() {
        const _form = this.getForm();
        const _controlKeys = _.keys(_form.controls);
        const tempState = {
            controls: _controlKeys,
            controlStatuses: _controlKeys.map(key => _form.controls[key].status),
            errors: _controlKeys.map(key => _form.controls[key].errors),
        };
        if (_form?.status !== 'INVALID') {
            this.lastControlsState = tempState;
            return;
        }
        if (!_.isEqual(tempState?.controls, this.lastControlsState?.controls) ||
            !_.isEqual(tempState?.controlStatuses, this.lastControlsState?.controlStatuses) ||
            !_.isEqual(tempState?.errors, this.lastControlsState?.errors)) {
            this.checkForm();
        }
        this.lastControlsState = tempState;
    }
}
