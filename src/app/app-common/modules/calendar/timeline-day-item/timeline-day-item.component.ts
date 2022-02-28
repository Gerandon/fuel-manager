import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'timeline-day-item',
    templateUrl: './timeline-day-item.component.html',
    styleUrls: ['./timeline-day-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TimelineDayItemComponent implements OnInit {

    @Input() public date: Date;
    @Input() public disabled: boolean = false;
    @Input() public recordings: any[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
