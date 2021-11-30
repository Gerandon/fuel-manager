import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'multiLine'
})
export class MultiLinePipe implements PipeTransform {

    transform(value: string[], ...args: unknown[]): string {
        return value.join('\n').toLocaleString();
    }

}
