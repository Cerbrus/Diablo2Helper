import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TCssAnimation } from '~types/animation';

@Component({
    selector: 'ui-sprite-animated',
    templateUrl: './ui-sprite-animated.component.html',
    styleUrls: ['./ui-sprite-animated.component.scss']
})
export class UiSpriteAnimatedComponent implements OnChanges {
    private readonly defaultAnimation: TCssAnimation = {
        direction: 'normal',
        duration: '1s',
        iterationCount: 'infinite'
    };

    @Input()
    public sprite!: string;

    @Input()
    public frames!: number;

    @Input()
    public scale = 1;

    @Input()
    public animation: Partial<TCssAnimation> = this.defaultAnimation;

    public imageStyle?: Observable<Partial<CSSStyleDeclaration>>;

    public ngOnChanges(changes: SimpleChanges): void {
        const hasChanges = ['sprite', 'frames', 'scale', 'animation'].some(
            value => changes[value].previousValue !== changes[value].currentValue
        );

        if (hasChanges) this.imageStyle = this.getImageStyle();
    }

    public getImageStyle(): Observable<Partial<CSSStyleDeclaration>> {
        const animation = { ...this.defaultAnimation, ...this.animation };
        const img = new Image();
        img.src = `/assets/images/sprites/${this.sprite}.png`;

        return fromEvent(img, 'load').pipe(
            map(event => <HTMLImageElement>event.target),
            map(image => ({
                width: `${this.scale * (image.width / this.frames)}px`,
                height: `${this.scale * image.height}px`,
                backgroundImage: `url(${image.src})`,
                animationTimingFunction: `steps(${this.frames - 1})`,
                animationIterationCount: animation.iterationCount,
                animationDirection: animation.direction,
                animationDuration: animation.duration
            }))
        );
    }
}
