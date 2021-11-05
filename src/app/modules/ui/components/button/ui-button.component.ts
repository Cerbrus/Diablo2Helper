import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LabeledBaseComponent } from '~modules/shared';

@Component({
    selector: 'ui-button',
    templateUrl: './ui-button.component.html',
    styleUrls: ['./ui-button.component.scss']
})
export class UiButtonComponent extends LabeledBaseComponent {
    @Input()
    public sprite!: string;

    @Input()
    public size = 32;

    @Input()
    public disabled = false;

    @Output()
    public onButtonPress: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    constructor(translate: TranslateService) {
        super(translate);
    }

    public getStyle(): Partial<CSSStyleDeclaration> {
        return {
            width: `${this.size}px`,
            height: `${this.size}px`,
            backgroundImage: `url(/assets/images/ui/buttons/${this.sprite}.png)`
        };
    }

    public onClick($event: MouseEvent): void {
        this.onButtonPress.emit($event);
    }
}
