import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive()
export abstract class TooltipBaseDirective {
    public tooltip!: HTMLDivElement;

    @Input('tooltipDelay')
    public delay = 500;

    @HostBinding('class')
    private className = this.cssClass;

    private tooltipContainer!: HTMLDivElement;

    private hideDelay?: number;

    private get nativeElement(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    protected constructor(
        private readonly cssClass: string,
        private readonly elementRef: ElementRef<HTMLElement>,
        protected readonly renderer: Renderer2,
        private document: Document
    ) {
        this.nativeElement.classList.add('pointer');
        this.setupContainer();
    }

    @HostListener('mouseover')
    public onMouseEnter(): void {
        this.cancelHide();
        this.tooltip = this.tooltip ?? this.createTooltip();

        this.hideAllOtherTooltips();
        this.renderer.addClass(this.tooltip, 'show');
    }

    @HostListener('mouseleave')
    public onMouseLeave(): void {
        this.cancelHide();
        this.hideDelay = window.setTimeout(() => {
            this.renderer.removeClass(this.tooltip, 'show');
        }, this.delay);
    }

    public appendRow(text: string, ...cssClasses: Array<string>): TooltipBaseDirective {
        const { renderer } = this;

        const row = renderer.createElement('div');
        row.appendChild(renderer.createText(text));

        if (cssClasses) cssClasses.forEach(cssClass => renderer.addClass(row, cssClass));

        this.tooltip.appendChild(row);
        return this;
    }

    public lineBreak(): TooltipBaseDirective {
        this.tooltip.appendChild(this.renderer.createElement('br'));
        return this;
    }

    protected abstract buildHtml(): void;

    private cancelHide(): void {
        if (this.hideDelay) clearTimeout(this.hideDelay);
    }

    private hideAllOtherTooltips(): void {
        if (!this.tooltip) return;
        Array.from(document.querySelectorAll('.tooltip.show'))
            .filter(element => element !== this.tooltip)
            .forEach(element => this.renderer.removeClass(element, 'show'));
    }

    private createTooltip(): HTMLDivElement {
        const { renderer } = this;

        this.tooltip = renderer.createElement('div');
        const { tooltip } = this;
        this.buildHtml();

        const hostPos = this.nativeElement.getBoundingClientRect();
        const top = window.scrollY + hostPos.bottom;
        const left = window.scrollX + hostPos.left + hostPos.width / 2;

        renderer.setStyle(tooltip, 'top', `${top}px`);
        renderer.setStyle(tooltip, 'left', `${left}px`);

        renderer.appendChild(this.tooltipContainer, tooltip);
        renderer.addClass(tooltip, 'tooltip');
        renderer.addClass(tooltip, this.cssClass);

        return tooltip;
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
}
