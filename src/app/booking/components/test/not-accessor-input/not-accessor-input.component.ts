import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-not-accessor-input',
    templateUrl: './not-accessor-input.component.html',
    styleUrls: ['./not-accessor-input.component.scss']
})
export class NotAccessorInputComponent implements OnInit {

    @Input() label;
    @Input() floatLabel;
    @Input() translateParams;
    @Input() type = 'text';
    @Input() disabled = false;
    @Input() maxLength = 512;
    @Input() name;
    @Input() required = false;
    @Input() placeholder = '';
    @Input() icon = '';
    @Input() suffix = '';

    @Input() value = '';
    @Output() onWriteValue = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
    }
}
