import { Component, HostBinding, Input } from '@angular/core';

@Component({ template: '' })
export abstract class SpriteBaseComponent {
    public name!: string;

    @Input()
    public size = 64;

    protected sprite!: string;

    protected abstract getBackground(): Record<'x' | 'y' | 'width' | 'height', number>;

    @HostBinding('style')
    public get style(): Partial<CSSStyleDeclaration> {
        return this.getStyle();
    }

    public getStyle(): Partial<CSSStyleDeclaration> {
        const { x, y, width, height } = this.getBackground();
        return {
            width: `${this.size}px`,
            height: `${this.size}px`,
            display: 'inline-grid',
            backgroundPositionX: `${x}px`,
            backgroundPositionY: `${y}px`,
            backgroundImage: `url(/assets/images/sprites/${this.sprite}.png)`,
            backgroundSize: `${width}px ${height}px`
        };
    }
}
