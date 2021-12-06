import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit, OnChanges {

    @Input() actions: ('CREATE' | 'EDIT' | 'COPY' | 'DELETE' | 'ALL')[];

    @Output() open = new EventEmitter<any>();
    @Output() edit = new EventEmitter<any>();
    @Output() copy = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();

    public showAll = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.actions) {
            this.showAll = changes.actions.currentValue.includes('ALL');
        }
    }
}
