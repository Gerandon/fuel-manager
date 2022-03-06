import {
    Component,
    ContentChild,
    Input,
    OnInit,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import {TimelineDayItem} from "../interfaces/calendar-common";

@Component({
    selector: 'timeline-day-item',
    templateUrl: './timeline-day-item.component.html',
    styleUrls: ['./timeline-day-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TimelineDayItemComponent implements OnInit {

    @Input() public date: Date;
    @Input() public disabled: boolean = false;
    @Input() public recordings: TimelineDayItem[];
    @ContentChild('dayRow',{static: false}) dayRowRef: TemplateRef<any>;

    constructor() {
    }

    ngOnInit(): void {
    }

}
