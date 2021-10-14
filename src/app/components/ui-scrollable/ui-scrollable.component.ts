import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Inject,
    Input
} from '@angular/core';

@Component({
    selector: 'ui-scrollable, [ui-scrollable]',
    templateUrl: './ui-scrollable.component.html',
    styleUrls: ['./ui-scrollable.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
    // encapsulation: ViewEncapsulation.None
})
export class UiScrollableComponent {
    @HostBinding('style.width')
    @Input('scroll-width')
    public width?: string;

    @HostBinding('style.height')
    @Input('scroll-height')
    public height?: string;

    private readonly thumbHeight = 28;

    constructor(@Inject(ElementRef) readonly elementRef: ElementRef<HTMLElement>) {
    }

    public get verticalScrolled(): number {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = this.elementRef.nativeElement;

        return scrollTop / (scrollHeight - clientHeight);
    }

    public get horizontalScrolled(): number {
        const {
            scrollLeft,
            scrollWidth,
            clientWidth
        } = this.elementRef.nativeElement;

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
        return this.verticalSize < 100;
    }

    public get hasHorizontalBar(): boolean {
        return this.horizontalSize < 100;
    }

    @HostListener('scroll')
    public onScroll() {
        // just to trigger change detection
    }

    public onVertical(scrollTop: number) {
        this.elementRef.nativeElement.scrollTop = scrollTop;
    }

    public onHorizontal(scrollLeft: number) {
        this.elementRef.nativeElement.scrollLeft = scrollLeft;
    }

    public verticalClick($event: MouseEvent) {
        const bar = this.getScrollbar($event);
        this.onVertical((($event.offsetY - 14) / bar.clientHeight) * this.elementRef.nativeElement.scrollHeight);
    }

    public horizontalClick($event: MouseEvent) {
        const bar = this.getScrollbar($event);
        this.onHorizontal((($event.offsetX - 14) / bar.clientWidth) * this.elementRef.nativeElement.scrollWidth);
    }

    private getScrollbar($event: MouseEvent): HTMLElement {
        const scrollbar = <HTMLElement>$event.target;
        return scrollbar.classList.contains('thumb') && scrollbar.parentElement
            ? scrollbar.parentElement
            : scrollbar;
    }
}
