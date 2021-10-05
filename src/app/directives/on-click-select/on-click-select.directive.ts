import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: 'input[onClickSelect],textarea[onClickSelect]'
})
export class OnClickSelectDirective {
    @HostListener('click', ['$event.target'])
    public select(target: HTMLInputElement): void {
        target.select();
    }
}
