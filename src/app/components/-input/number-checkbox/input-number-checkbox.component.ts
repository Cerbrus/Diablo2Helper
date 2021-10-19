import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'input-number-checkbox',
    templateUrl: './input-number-checkbox.component.html',
    styleUrls: ['./input-number-checkbox.component.scss']
})
export class InputNumberCheckboxComponent {
    @Input()
    public value!: number | undefined;

    @Output()
    public valueChange = new EventEmitter<number>();

    @Input()
    public small = false;

    public onCheck(): void {
        this.value = 1;
        this.onChange();
    }

    public onChange(): void {
        this.valueChange.emit(this.value);
    }
}
