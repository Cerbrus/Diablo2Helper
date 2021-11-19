import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator, Validators } from '@angular/forms';

@Directive({
    selector: '[min]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinDirective, multi: true }]
})
export class MinDirective implements Validator {
    @Input() min!: number;

    public validate(control: FormControl): { [key: string]: any } | null {
        const validationResult = Validators.min(this.min)(control);
        if (validationResult?.min) control.setValue(Math.max(this.min, control.value));
        return validationResult;
    }
}
