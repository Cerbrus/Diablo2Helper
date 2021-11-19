import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DomHelper, Helper, StringHelper } from '~helpers';
import { char } from '~types/helpers';
import { PopupService } from './popup.service';

@Injectable({ providedIn: 'root' })
export class KeyboardShortcutService {
    private registeredKeys: Array<char> = [StringHelper.Char('?')];
    private keyGroups: Map<string, Array<char>> = new Map([['title', [StringHelper.Char('?')]]]);
    private readonly listeners: Map<char, HTMLElement>;
    private readonly metaKeys = ['Control', 'Alt', 'Shift', 'Meta'];

    private static = KeyboardShortcutService;
    private tooltip?: HTMLDivElement;

    constructor(
        private readonly popupService: PopupService,
        private readonly translate: TranslateService,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.listeners = new Map([[StringHelper.Char('?'), document.body]]);
        document.body.addEventListener('keydown', this.onKeyDown.bind(this));
        document.body.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    private get popup(): PopupService {
        return this.popupService.using(this.tooltip);
    }

    private static hasMetaKey(event: KeyboardEvent): boolean {
        return event.ctrlKey || event.altKey || event.shiftKey || event.metaKey;
    }

    public registerKey(key: char, element: HTMLElement, group?: string): void {
        if (this.listeners.hasOwnProperty(key))
            throw new Error(`A listener for key [${key}] has already been registered!`);

        this.listeners.set(key, element);
        this.registeredKeys.push(key);
        if (group) {
            if (!this.keyGroups.has(group)) this.keyGroups.set(group, []);
            const g = this.keyGroups.get(group);
            Helper.assertHasValue(g);
            g.push(key);
        }
    }

    private onKeyDown(event: KeyboardEvent): void {
        if (DomHelper.isInput(<HTMLElement>event.target)) return;

        const key = event.key;
        if (key === StringHelper.Char('?')) {
            event.preventDefault();

            if (!this.tooltip) this.createTooltip();
            if (!this.popup.isVisible) this.fillTooltip();
            this.popup.toggle();

            return this.toggleHelp();
        }

        if (this.metaKeys.includes(key)) {
            event.preventDefault();
            return this.toggleHelp(true);
        }

        if (!StringHelper.isChar(key)) return;

        if (this.registeredKeys.includes(key) && !this.static.hasMetaKey(event)) {
            event.preventDefault();
            const target = this.listeners.get(key);
            if (target && DomHelper.isVisible(target)) {
                target.click();
                setTimeout(() => {
                    this.fillTooltip();
                });
            }
        }
    }

    private onKeyUp(event: KeyboardEvent): void {
        if (
            DomHelper.isInput(<HTMLElement>event.target) ||
            !(this.metaKeys.includes(event.key) || this.static.hasMetaKey(event))
        ) {
            return;
        }

        event.preventDefault();
        this.toggleHelp(false);
        this.tooltip && this.popup.endUsing();
    }

    private toggleHelp(show?: boolean): void {
        DomHelper.getRoot().classList.toggle('show-keyboard-hints', show || (this.tooltip && this.popup.isVisible));
    }

    private createTooltip(): void {
        this.tooltip = this.popupService.createElement('tooltip', 'tooltip-keyboard-shortcuts');
        this.popup.setPosition({ bottom: 16, left: 16 }, true).endUsing();
    }

    private fillTooltip(): void {
        if (!this.tooltip) return;
        this.popup.empty();

        this.registeredKeys.forEach(key => {
            if (![...this.keyGroups.values()].some(g => g.includes(key))) this.buildKeyRow(key);
        });

        this.keyGroups.forEach((keys, group) => {
            if (!keys?.some(key => this.isTargetVisible(key))) return;

            this.popup.appendRow(this.translate.instant(`tooltip.keyboardShortcuts.${group}`), 'key-group-title');

            keys.sort((a: string, b: string) => a.localeCompare(b)).forEach(this.buildKeyRow.bind(this));
        });

        this.popup.endUsing();
    }

    private buildKeyRow(key: char): void {
        if (!this.isTargetVisible(key)) return;

        const description = DomHelper.createElement('span');
        DomHelper.underlineLetter(description, this.translate.instant(`tooltip.keyboardShortcuts.${key}`), key, 1);

        this.popup
            .append(DomHelper.createElement('span', key, 'shortcut-key', 'text-ml'))
            .append(DomHelper.createElement('span', description));
    }

    private isTargetVisible(key: char): boolean {
        const element = this.listeners.get(key);
        return DomHelper.isVisible(element);
    }
}
