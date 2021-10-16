import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Inject,
    Input
} from '@angular/core';

type TShadow = '0' | '20px' | '-20px';

@Component({
    selector: 'ui-scrollable, [ui-scrollable]',
    templateUrl: './ui-scrollable.component.html',
    styleUrls: ['./ui-scrollable.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiScrollableComponent {
    @HostBinding('style.width')
    @Input('scroll-width')
    public width?: string;

    @HostBinding('style.height')
    @Input('scroll-height')
    public height?: string;

    @Input()
    public horizontal: 'top' | 'bottom' | 'none' | 'child' = 'bottom';

    @Input()
    public vertical: 'left' | 'right' | 'none' | 'child' = 'right';

    private readonly thumbHeight = 15;

    constructor(@Inject(ElementRef) readonly elementRef: ElementRef<HTMLElement>) {
    }

    public get verticalScrolled(): number {
        const { scrollTop, scrollHeight, clientHeight } = this.elementRef.nativeElement;
        return scrollTop / (scrollHeight - clientHeight);
    }

    public get horizontalScrolled(): number {
        const { scrollLeft, scrollWidth, clientWidth } = this.elementRef.nativeElement;
        return scrollLeft / (scrollWidth - clientWidth);
    }

    public get verticalPosition(): number {
        const thumbPortion = (this.thumbHeight / this.elementRef.nativeElement.clientHeight) * 100;
        return this.verticalScrolled * (100 - thumbPortion);
    }

    public get horizontalPosition(): number {
        const thumbPortion = (this.thumbHeight / this.elementRef.nativeElement.clientWidth) * 100;
        return this.horizontalScrolled * (100 - thumbPortion);
    }

    public get verticalSize(): number {
        const { clientHeight, scrollHeight } = this.elementRef.nativeElement;
        return Math.ceil((clientHeight / scrollHeight) * 100);
    }

    public get horizontalSize(): number {
        const { clientWidth, scrollWidth } = this.elementRef.nativeElement;
        return Math.ceil((clientWidth / scrollWidth) * 100);
    }

    public get hasVerticalBar(): boolean {
        return this.vertical !== 'none' && this.verticalSize < 100;
    }

    public get hasHorizontalBar(): boolean {
        return this.horizontal !== 'none' && this.horizontalSize < 100;
    }

    @HostListener('scroll')
    public onScroll() {
        // just to trigger change detection
    }

    @HostBinding('style.--scroll-shadow')
    public get boxShadow(): string {
        const shadows: Array<`inset ${TShadow} ${TShadow} 20px -20px #000000`> = [];
        const {
            scrollHeight, scrollTop, clientHeight,
            scrollWidth, scrollLeft, clientWidth
        } = this.elementRef.nativeElement;

        if (scrollTop > 0)
            shadows.push(UiScrollableComponent.shadow(0, 1));
        if (clientHeight + scrollTop < scrollHeight - 5)
            shadows.push(UiScrollableComponent.shadow(0, -1));
        if (scrollLeft > 0)
            shadows.push(UiScrollableComponent.shadow(1, 0));
        if (clientWidth + scrollLeft < scrollWidth - 5)
            shadows.push(UiScrollableComponent.shadow(-1, 0));

        return shadows.join(', ');
    }

    public onVertical(scrollTop: number) {
        this.elementRef.nativeElement.scrollTop = scrollTop;
    }

    public onHorizontal(scrollLeft: number) {
        this.elementRef.nativeElement.scrollLeft = scrollLeft;
    }

    public verticalClick($event: MouseEvent) {
        const bar = <HTMLElement>$event.target;
        if (!bar.classList.contains('bar'))
            return;

        const { scrollHeight, clientHeight } = this.elementRef.nativeElement;
        this.onVertical(($event.offsetY / bar.clientHeight) * (scrollHeight - clientHeight));
    }

    public horizontalClick($event: MouseEvent) {
        const bar = <HTMLElement>$event.target;
        if (!bar.classList.contains('bar'))
            return;

        const { scrollWidth, clientWidth } = this.elementRef.nativeElement;
        this.onHorizontal(($event.offsetX / bar.clientWidth) * (scrollWidth - clientWidth));
    }

    private static shadow(horizontal: 1 | -1 | 0, vertical: 1 | -1 | 0):
        `inset ${TShadow} ${TShadow} 20px -20px #000000` {
        const h = <TShadow>(horizontal ? horizontal * 20 + 'px' : 0);
        const v = <TShadow>(vertical ? vertical * 20 + 'px' : 0);

        return `inset ${h} ${v} 20px -20px #000000`;
    }
}
