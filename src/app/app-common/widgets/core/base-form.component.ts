import {NgForm} from "@angular/forms";
import {
    Directive,
    OnInit, ViewChild,
} from "@angular/core";
import {v4} from "uuid";

@Directive()
export class BaseFormComponent implements OnInit {

    @ViewChild('ownForm', {static: true}) ownForm!: NgForm;
    private currentFormId!: string;

    constructor(protected parentForm: NgForm) {
    }

    ngOnInit() {
        this.currentFormId = `${v4()}`;
        if (this.parentForm) {
            if (this.ownForm != null && !this.parentForm.form.contains(this.currentFormId)) {
                this.parentForm.form.addControl(this.currentFormId, this.ownForm.form);
            }
        }
    }

}
