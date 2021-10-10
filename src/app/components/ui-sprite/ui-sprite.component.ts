import { Component, Input } from '@angular/core';

@Component({
    selector: 'ui-sprite',
    templateUrl: './ui-sprite.component.html',
    styleUrls: ['./ui-sprite.component.scss']
})
export class UiSpriteComponent {
    @Input()
    public sprite!: string;

    @Input()
    public frames!: number;

    @Input()
    public width?: number;

    @Input()
    public fileWidth?: number;

    @Input()
    public height?: number;

    @Input()
    public size = 64;

    @Input()
    public scale = 1;

    @Input()
    public animation: Partial<{
        direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse',
        duration: CSSStyleDeclaration['animationDuration']
        iterationCount?: CSSStyleDeclaration['animationIterationCount']
    }> = {
        direction: 'alternate',
        duration: '1.5s',
        iterationCount: 'infinite'
    };

    public getImageStyle(): Partial<CSSStyleDeclaration> {
        const animation = {
            ...{
                direction: 'alternate',
                duration: '1.5s',
                iterationCount: 'infinite'
            },
            ...this.animation
        };

        return {
            width: this.getWidth(),
            height: this.getHeight(),
            backgroundImage: `url(/assets/images/sprites/${this.sprite}.png)`,
            animationTimingFunction: `steps(${this.frames - 1})`,
            animationIterationCount: animation.iterationCount,
            animationDirection: animation.direction,
            animationDuration: animation.duration
        };
    }

    private getWidth(): string {
        return `${this.scale * (
            this.fileWidth
                ? this.fileWidth / this.frames
                : this.width ?? this.size)}px`;
    }

    private getHeight(): string {
        return `${this.scale * (this.height ?? this.size)}px`;
    }
}
