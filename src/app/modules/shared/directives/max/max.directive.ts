import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator, Validators } from '@angular/forms';

@Directive({
    selector: '[min]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MaxDirective, multi: true }]
})
export class MaxDirective implements Validator {
    @Input() max!: number;

    public validate(control: FormControl): { [key: string]: any } | null {
        const validationResult = Validators.max(this.max)(control);
        if (validationResult?.max) control.setValue(Math.min(this.max, control.value));
        return validationResult;
    }
}
