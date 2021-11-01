import {Pipe, PipeTransform} from '@angular/core';
import {isObservable, of} from "rxjs";
import {catchError, map, startWith} from "rxjs/operators";

@Pipe({
    name: 'withLoading'
})
export class WithLoadingPipe implements PipeTransform {

    transform(_value: any, ...args: any[]): any {
        return isObservable(_value)
            ? _value.pipe(
                map((value: any) => ({ loading: false, value })),
                startWith({ loading: true }),
                catchError(error => of({ loading: false, error }))
            )
            : _value;
    }

}
