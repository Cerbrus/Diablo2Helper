import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'input-checkbox',
    templateUrl: './input-checkbox.component.html',
    styleUrls: ['./input-checkbox.component.scss']
})
export class InputCheckboxComponent {
    @Input()
    public label?: string;

    @Input()
    public labelKey?: string;

    @Input()
    public isXl = false;

    @Input()
    public checked!: boolean | undefined;

    @Output()
    public checkedChange = new EventEmitter<boolean>();

    @Output()
    public click = new EventEmitter<void>();

    public iconCheck = faCheck;
    public iconX = faTimes;

    constructor(private readonly translate: TranslateService) {
    }

    public onClick(): void {
        this.checked = !this.checked;
        this.checkedChange.emit(this.checked);
        this.click.emit();
    }

    public getLabel(): string | undefined {
        return this.labelKey ? this.translate.instant(this.labelKey) : this.label;
    }
}
