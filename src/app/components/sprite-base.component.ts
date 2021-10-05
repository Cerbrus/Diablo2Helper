import { Component, HostBinding, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({ template: '' })
export abstract class SpriteBaseComponent {
    name!: string;
    sprite!: string;

    @Input()
    size = 64;

    protected constructor(protected readonly translate: TranslateService) {
    }

    @HostBinding('style')
    get style(): Partial<CSSStyleDeclaration> {
        return this.getStyle();
    }

    public getStyle(): Partial<CSSStyleDeclaration> {
        return {
            width: `${this.size}px`,
            height: `${this.size}px`
        };
    }
}
