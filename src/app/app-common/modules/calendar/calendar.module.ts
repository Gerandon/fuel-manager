import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimelineComponent} from './timeline/timeline.component';
import {VendorModule} from "../../vendor/vendor.module";
import { TimelineDayItemComponent } from './timeline-day-item/timeline-day-item.component';


@NgModule({
    declarations: [
        TimelineComponent,
        TimelineDayItemComponent
    ],
    exports: [
        TimelineComponent
    ],
    imports: [
        CommonModule,
        VendorModule
    ]
})
export class CalendarModule {
}
