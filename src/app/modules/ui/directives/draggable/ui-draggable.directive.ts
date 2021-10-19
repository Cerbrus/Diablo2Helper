import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Input, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { TMouseEvent } from '../../../../types/events';
import { UiScrollableComponent } from '../../components';

@Directive({
    selector: '[ui-draggable]'
})
export class UiDraggableDirective {
    @Input('ui-draggable')
    public draggable: 'vertical' | 'horizontal' = 'vertical';

    @Output()
    public dragged = fromEvent<TMouseEvent<HTMLElement>>(
        this.elementRef.nativeElement,
        'mousedown'
    ).pipe(
        switchMap(event => {
            event.preventDefault();

            const clientRect = event.target.getBoundingClientRect();
            const offsetVertical = UiDraggableDirective.getOffsetVertical(event, clientRect);
            const offsetHorizontal = UiDraggableDirective.getOffsetHorizontal(event, clientRect);

            return fromEvent<MouseEvent>(this.documentRef, 'mousemove').pipe(
                map(event => this.getScrolled(event, offsetVertical, offsetHorizontal)),
                takeUntil(fromEvent(this.documentRef, 'mouseup'))
            );
        })
    );

    constructor(
        @Inject(UiScrollableComponent) private readonly scrollbar: UiScrollableComponent,
        @Inject(DOCUMENT) private readonly documentRef: Document,
        @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>
    ) {
    }

    private getScrolled(
        { clientY, clientX }: MouseEvent,
        offsetVertical: number,
        offsetHorizontal: number
    ): number {
        const { offsetHeight, offsetWidth } = this.elementRef.nativeElement;
        const { nativeElement } = this.scrollbar.elementRef;
        const { top, left, width, height } = nativeElement.getBoundingClientRect();

        const maxTop = nativeElement.scrollHeight - height;
        const maxLeft = nativeElement.scrollWidth - width;
        const scrolledTop =
            (clientY - top - offsetHeight * offsetVertical) / (height - offsetHeight);
        const scrolledLeft =
            (clientX - left - offsetWidth * offsetHorizontal) / (width - offsetWidth);

        return this.draggable === 'vertical'
            ? maxTop * scrolledTop
            : maxLeft * scrolledLeft;
    }

    private static getOffsetVertical({ clientY }: MouseEvent, { top, height }: ClientRect): number {
        return (clientY - top) / height;
    }

    private static getOffsetHorizontal({ clientX }: MouseEvent, { left, width }: ClientRect): number {
        return (clientX - left) / width;
    }
}
