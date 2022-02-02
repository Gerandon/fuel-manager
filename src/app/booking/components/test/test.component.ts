import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {tap} from "rxjs/operators";
import {combineLatest} from "rxjs";

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

    @ViewChild('simpleForm', { static: true }) public simpleForm: NgForm;

    public testModel = {
        input_one: '',
        input_two: ''
    };

    public formGroup: FormGroup;

    constructor() {
        this.formGroup = new FormGroup({
            input: new FormControl('')
        });
    }

    ngOnInit(): void {
        this.simpleForm.valueChanges.pipe(
            tap(() => {
                console.log({
                    valid: this.simpleForm.valid,
                    controls: this.simpleForm.controls,
                });
            })
        ).subscribe();

        this.formGroup.valueChanges.pipe(
            tap(() => {
                console.log({
                    valid: this.formGroup.valid,
                    controls: this.formGroup.controls,
                });
            })
        ).subscribe();
    }

}
