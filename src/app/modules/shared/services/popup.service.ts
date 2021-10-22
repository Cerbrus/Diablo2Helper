import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DomHelper, Helper } from '~helpers';

@Injectable({ providedIn: 'root' })
export class PopupService {
    private renderer: Renderer2;

    private element?: HTMLDivElement;
    private tooltipContainer?: HTMLDivElement;

    public get isVisible(): boolean {
        this.hasElement(this.element);
        return this.element.classList.contains('show');
    }

    protected constructor(rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document) {
        this.renderer = rendererFactory.createRenderer(null, null);
        this.setupContainer();
    }

    public using(element?: HTMLDivElement): this {
        this.hasElement(element);
        this.element = element;
        return this;
    }

    public endUsing(): void {
        this.hasElement(this.element);
        delete this.element;
    }

    public empty(): this {
        this.hasElement(this.element);
        while (this.element.firstChild) this.element.removeChild(this.element.firstChild);

        return this;
    }

    public lineBreak(): this {
        return this.append(this.renderer.createElement('br'));
    }

    public appendRow(element: string | Node, ...cssClasses: Array<string>): this {
        const { renderer } = this;

        const row = renderer.createElement('div');
        renderer.appendChild(row, this.toNode(element));

        if (cssClasses) cssClasses.forEach(cssClass => renderer.addClass(row, cssClass));

        return this.append(row);
    }

    public append(element: string | Node): this {
        this.hasElement(this.element);
        this.hasElement(element);

        this.renderer.appendChild(this.element, this.toNode(element));
        return this;
    }

    private toNode(element: string | Node): Node {
        return typeof element === 'string' ? this.renderer.createText(element) : element;
    }

    public setPosition(
        {
            top,
            right,
            bottom,
            left
        }: {
            top?: number;
            right?: number;
            bottom?: number;
            left?: number;
        },
        fixed = false
    ): this {
        this.hasElement(this.element);

        const { element, renderer } = this;
        renderer.setStyle(element, 'top', top ? `${top}px` : null);
        renderer.setStyle(element, 'right', right ? `${right}px` : null);
        renderer.setStyle(element, 'bottom', bottom ? `${bottom}px` : null);
        renderer.setStyle(element, 'left', left ? `${left}px` : null);

        if (fixed) this.element?.classList.add('fixed');

        return this;
    }

    public show(): this {
        return this.toggle(true);
    }

    public hide(): this {
        return this.toggle(false);
    }

    public toggle(show?: boolean): this {
        if (typeof show === 'undefined') show = !this.isVisible;

        this.hasElement(this.element);
        (show ? this.renderer.addClass : this.renderer.removeClass)(this.element, 'show');

        return this;
    }

    public hideAllOtherTooltips(): this {
        this.hasElement(this.element);

        Array.from(document.querySelectorAll('.tooltip.show'))
            .filter(element => element !== this.element)
            .forEach(element => this.renderer.removeClass(element, 'show'));

        return this;
    }

    public createElement(...cssClass: Array<string>): HTMLDivElement {
        const element = DomHelper.createElement('div', null, ...cssClass);
        this.renderer.appendChild(this.tooltipContainer, element);
        return element;
    }

    private setupContainer(): void {
        const { body } = this.document;
        const containers = <HTMLCollectionOf<HTMLDivElement>>body.getElementsByClassName('tooltip-container');
        if (!containers.length) {
            this.tooltipContainer = this.renderer.createElement('div');
            this.renderer.addClass(this.tooltipContainer, 'tooltip-container');
            this.renderer.appendChild(body, this.tooltipContainer);
        } else {
            this.tooltipContainer = containers[0];
        }
    }

    // noinspection JSMethodCanBeStatic
    private hasElement<T>(element: T | null | undefined): asserts element is T {
        return Helper.assertHasValue(element, 'The PopupService needs an element to work on');
    }
}
