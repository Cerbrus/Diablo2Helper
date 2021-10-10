import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { takeLast } from 'rxjs/operators';

@Component({ template: '' })
export abstract class LabeledBaseComponent {
    @Input()
    public label?: string;

    @Input()
    public labelKey?: string;

    constructor(private readonly translate: TranslateService) {
    }

    public labelTranslated?: string;

    public getLabel(): string {
        if (this.labelTranslated) {
            return this.labelTranslated;
        }

        if (this.labelKey)
            this.translate.get(this.labelKey)
                .pipe(takeLast(1))
                .subscribe((result) => this.labelTranslated = result);

        return <string>(this.labelKey ?? this.label);
    }
}
