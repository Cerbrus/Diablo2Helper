import { Directive, HostListener } from '@angular/core';

@Directive({ selector: 'input[onClickSelect], textarea[onClickSelect], pre[onClickSelect]' })
export class OnClickSelectDirective {
    @HostListener('click', ['$event.target'])
    public select(target: HTMLInputElement | HTMLTextAreaElement | HTMLPreElement): void {
        if (target instanceof HTMLPreElement) {
            const range = document.createRange();
            range.selectNodeContents(target);
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
            }
        } else {
            target.select();
        }
    }
}
