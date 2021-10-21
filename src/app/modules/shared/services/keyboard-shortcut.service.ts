import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { DomHelper, ObjectHelper } from '~helpers';
import { TLetter } from '~types/helpers';

@Injectable({ providedIn: 'root' })
export class KeyboardShortcutService {
    private listeners: Partial<Record<TLetter | '?', HTMLElement>>;
    private registeredKeys: Array<TLetter | '?'> = [];
    private readonly metaKeys = ['Control', 'Alt', 'Shift', 'Meta'];

    private static = KeyboardShortcutService;

    constructor(@Inject(DOCUMENT) private document: Document) {
        this.listeners = { '?': document.body };
        document.body.addEventListener('keydown', this.onKeyDown.bind(this));
        document.body.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    public registerKey(key: TLetter | '?', element: HTMLElement): void {
        if (this.listeners.hasOwnProperty(key))
            throw new Error(`A listener for key [${key}] has already been registered!`);

        this.listeners[key] = element;
        this.registeredKeys = ObjectHelper.keys(this.listeners);
    }

    private onKeyDown(event: KeyboardEvent): void {
        if (!this.static.isAllowedEvent(event)) return;

        const key = <TLetter | '?'>event.key;

        if (key === '?') {
            event.preventDefault();
            return this.toggleHelp();
        }

        if (this.metaKeys.includes(key)) {
            event.preventDefault();
            return this.toggleHelp(true);
        }

        if (this.registeredKeys.includes(key)) {
            if (!this.static.hasMetaKey(event)) event.preventDefault();

            const target = this.listeners[key];
            if (target && DomHelper.isVisible(target)) target.click();
        }
    }

    private onKeyUp(event: KeyboardEvent): void {
        if (!this.static.isAllowedEvent(event)) return;

        if (this.metaKeys.includes(event.key)) {
            event.preventDefault();
            this.toggleHelp(false);
        }
    }

    private toggleHelp(show?: boolean): void {
        this.document.body.classList.toggle('show-keyboard-hints', show);
    }

    private static isAllowedEvent(event: KeyboardEvent): boolean {
        return !DomHelper.isInput(<HTMLElement>event.target) || this.hasMetaKey(event);
    }

    private static hasMetaKey(event: KeyboardEvent): boolean {
        return event.ctrlKey || event.altKey || event.shiftKey || event.metaKey;
    }
}
