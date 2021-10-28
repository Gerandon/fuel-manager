import { Injectable } from '@angular/core';
import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

@Injectable()
export class MissingTranslationService implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams): string {
        // @ts-ignore
        return params.interpolateParams && params.interpolateParams['fallback'] ? params.interpolateParams['fallback']
            : params.key;
    }
}
