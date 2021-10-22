import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { DomHelper, Helper, StringHelper } from '~helpers/ts';
import { KeyboardShortcutService } from '~modules/shared/services';
import { char, TLetter } from '~types/helpers';

@Directive({ selector: '[keyboardShortcut]' })
export class KeyboardShortcutDirective implements AfterViewInit {
    private shortcutKey!: char;

    @Input('keyboardShortcut')
    public set key(key: TLetter | '?' | undefined) {
        if (!key) return;

        this.shortcutKey = StringHelper.Char(key);
    }

    @Input()
    public group?: string;

    constructor(
        private readonly shortcutService: KeyboardShortcutService,
        private readonly elementRef: ElementRef<HTMLElement>
    ) {}

    public ngAfterViewInit(): void {
        Helper.assertHasValue(this.shortcutKey);

        this.shortcutService.registerKey(this.shortcutKey, this.elementRef.nativeElement, this.group);

        setTimeout(() => {
            if (!this.shortcutKey) return;

            const element = this.elementRef.nativeElement;
            const overlay = document.createElement('div');

            overlay.classList.add('keyboard-shortcut-overlay');
            element.classList.add('keyboard-shortcut');

            DomHelper.underlineLetter(overlay, element.innerText, this.shortcutKey);

            element.append(overlay);
        });
    }
}
