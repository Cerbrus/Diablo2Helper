import { Component, HostBinding, Input } from '@angular/core';

@Component({ template: '' })
export abstract class SpriteBaseComponent {
    public name!: string;
    public sprite!: string;

    @Input()
    public size = 64;

    protected abstract getBackgroundX(): number;

    protected abstract getBackgroundY(): number;

    @HostBinding('style')
    public get style(): Partial<CSSStyleDeclaration> {
        return this.getStyle();
    }

    public getStyle(): Partial<CSSStyleDeclaration> {
        return {
            width: `${this.size}px`,
            height: `${this.size}px`,
            backgroundPositionX: `${this.getBackgroundX()}px`,
            backgroundPositionY: `${this.getBackgroundY()}px`
        };
    }
}
