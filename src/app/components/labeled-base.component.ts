import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({ template: '' })
export abstract class LabeledBaseComponent {
    @Input()
    public label?: string;

    @Input()
    public labelKey?: string;

    constructor(private readonly translate: TranslateService) {
    }

    public getLabel(): string {
        return this.labelKey
            ? this.translate.instant(this.labelKey)
            : this.label;
    }
}
