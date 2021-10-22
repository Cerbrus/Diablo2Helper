import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { Helper } from '~helpers';
import { PopupService } from '~modules/shared/services/popup.service';

@Directive()
export abstract class TooltipBaseDirective {
    public tooltip?: HTMLDivElement;

    @Input('tooltipDelay')
    public delay = 500;

    @HostBinding('class')
    private className = this.cssClass;

    private hideDelay?: number;

    protected get popup(): PopupService {
        return this.popupService.using(this.tooltip);
    }

    private get nativeElement(): HTMLElement | undefined {
        return this.elementRef?.nativeElement;
    }

    protected constructor(
        private readonly cssClass: string,
        private readonly popupService: PopupService,
        private readonly elementRef: ElementRef<HTMLElement>
    ) {
        this.nativeElement?.classList.add('pointer');
    }

    @HostListener('mouseover')
    public onMouseEnter(): void {
        this.cancelHide();
        if (!this.tooltip) this.createTooltip();

        this.popup.hideAllOtherTooltips().show().endUsing();
    }

    @HostListener('mouseleave')
    public onMouseLeave(): void {
        this.cancelHide();
        this.hideDelay = window.setTimeout(() => {
            this.popup.hide().endUsing();
        }, this.delay);
    }

    protected abstract buildHtml(): void;

    protected setPosition(): void {
        Helper.assertHasValue(this.nativeElement);

        const hostPos = this.nativeElement.getBoundingClientRect();
        const top = window.scrollY + hostPos.bottom;
        const left = window.scrollX + hostPos.left + hostPos.width / 2;

        this.popup.setPosition({ top, left });
    }

    private cancelHide(): void {
        if (this.hideDelay) clearTimeout(this.hideDelay);
    }

    private createTooltip(): void {
        this.tooltip = this.popupService.createElement(this.cssClass, 'tooltip');
        this.buildHtml();
        this.setPosition();
    }
}
