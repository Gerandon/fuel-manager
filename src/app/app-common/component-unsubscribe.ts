import {Observable, Subject, takeUntil} from "rxjs";

/**
 * -
 * Tested with checking the "complete" event of a subscribe method
 * @constructor
 */
export const UnsubscribeOnDestroy = (): PropertyDecorator => {
    return (target: Object | any, propertyKey: string | symbol) => {
        const ngOnDestroy = target.ngOnDestroy;
        const destroySubject$ = new Subject();

        let currentValue: Observable<any> = target[propertyKey];

        Object.defineProperty(target, propertyKey, {
            set: (newValue: any) => {
                if (newValue instanceof Observable) {
                    currentValue = (<Observable<any>>newValue).pipe(
                        takeUntil(destroySubject$)
                    );
                } else {
                    currentValue = newValue;
                }
            },
            get: () => currentValue
        });

        target.ngOnDestroy = function () {
            if (currentValue instanceof Observable) {
                destroySubject$.next(true);
                destroySubject$.complete();
            }
            ngOnDestroy && ngOnDestroy.call(this);
        }
    };
}
