import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { DomHelper } from '~helpers/ts';
import { KeyboardShortcutService } from '~modules/shared/services';
import { TLetter } from '~types/helpers';

@Directive({ selector: '[keyboardShortcut]' })
export class KeyboardShortcutDirective implements AfterViewInit {
    private shortcutKey?: TLetter | '?';

    @Input('keyboardShortcut')
    public set key(key: TLetter | '?' | undefined) {
        if (!key) return;

        this.shortcutKey = key;
        this.shortcutService.registerKey(key, this.elementRef.nativeElement);
    }

    constructor(
        private readonly shortcutService: KeyboardShortcutService,
        private readonly elementRef: ElementRef<HTMLElement>
    ) {}

    public ngAfterViewInit(): void {
        setTimeout(() => {
            if (!this.shortcutKey) return;

            const element = this.elementRef.nativeElement;
            const overlay = document.createElement('div');

            overlay.classList.add('overlay');
            element.classList.add('keyboard-shortcut');

            const [before, letter, after] = element.innerText.split(new RegExp('(' + this.shortcutKey + ')(.+)', 'i'));

            overlay.append(before);
            overlay.append(DomHelper.createElement('span', letter, 'accent'));
            overlay.append(after);

            element.append(overlay);
        });
    }
}
