import {Pipe, PipeTransform} from '@angular/core';
import {TimelineDayItem} from "../interfaces/calendar-common";

@Pipe({
    name: 'recordValue'
})
export class RecordValuePipe implements PipeTransform {

    transform(recording: TimelineDayItem, ...args: unknown[]): string {
        return recording.props.map(item => item.value).join(` ${recording.separator} `);
    }

}
