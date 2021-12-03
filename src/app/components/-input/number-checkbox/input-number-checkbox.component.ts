import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

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

    @ViewChild('inputElement', { static: false, read: ElementRef })
    private input!: ElementRef<HTMLInputElement>;

    public onCheck(): void {
        this.value = 1;
        this.onChange();

        setTimeout(() => {
            this.input?.nativeElement?.select();
        });
    }

    public onChange(): void {
        this.valueChange.emit(this.value);
    }
}
