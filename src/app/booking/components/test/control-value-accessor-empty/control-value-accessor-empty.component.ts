import {Component} from '@angular/core';
import {ControlValueAccessor} from "@angular/forms";

@Component({
    selector: 'app-control-value-accessor-empty',
    templateUrl: './control-value-accessor-empty.component.html',
    styleUrls: ['./control-value-accessor-empty.component.scss']
})
export class ControlValueAccessorEmptyComponent implements ControlValueAccessor {

    constructor() {
    }

    registerOnChange(fn: any): void {
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(obj: any): void {
    }
}
