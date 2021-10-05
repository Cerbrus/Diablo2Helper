import { Injectable, Injector } from '@angular/core';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateService } from '@ngx-translate/core';

@Injectable()
export class LogMissingTranslationHandler implements MissingTranslationHandler {
    private logTimeout?: number;
    private missingKeys: Array<string> = [];

    private translate?: TranslateService;

    constructor(private injector: Injector) {
    }

    public handle({ key }: MissingTranslationHandlerParams): string {
        if (this.translate == null)
            this.translate = this.injector.get(TranslateService);

        if (!Object.keys(this.translate.store.translations).length ||
            this.missingKeys.includes(key))
            return key;

        this.missingKeys.push(key);

        if (this.logTimeout != null) {
            clearTimeout(this.logTimeout);
            this.logTimeout = undefined;
        }

        setTimeout(this.logMissingKeys.bind(this), 100);

        return `[${key}]`;
    }

    private logMissingKeys(): void {
        const count = this.missingKeys.length;
        if (!count) return;

        const s = count > 1 ? 's' : '';

        console.groupCollapsed(`Translation${s} missing for ${count} key${s}:`);
        console.info(this.missingKeys.join('\n'));
        console.groupEnd();

        this.missingKeys = [];
    }
}
