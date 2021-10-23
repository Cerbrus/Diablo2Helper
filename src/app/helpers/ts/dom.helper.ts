import { char } from '~types/helpers';

type TChild = string | Node | null;

export class DomHelper {
    public static createElement(tagName: 'span', child?: TChild, ...cssClass: Array<string>): HTMLSpanElement;
    public static createElement(tagName: 'div', child?: TChild, ...cssClass: Array<string>): HTMLDivElement;
    public static createElement(tagName: string, child?: TChild, ...cssClass: Array<string>): HTMLElement {
        const element = document.createElement(tagName);

        if (child) element.append(child);
        if (cssClass?.length) element.classList.add(...cssClass);

        return element;
    }

    public static isInput(element: HTMLElement | null): boolean {
        return !!element && ['input', 'textarea'].includes(element.tagName.toLowerCase());
    }

    public static isVisible(element?: HTMLElement): boolean {
        return !!element && !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
    }

    public static underlineLetter(container: HTMLElement, text: string, key: char, skipWords = 0) {
        if (!text.toLowerCase().includes((<string>key).toLowerCase())) {
            container.append(text);
            return;
        }

        const words = text.split(' ');
        const skipped = words.slice(0, skipWords);

        const k = key === '?' ? '\\?' : key;
        const [before, letter, after] = words
            .slice(skipWords)
            .join(' ')
            .split(new RegExp(`(${k})(.+)`, 'i'));

        if (skipWords) container.append(`${skipped.join(' ')} `);
        container.append(before);
        container.append(DomHelper.createElement('span', letter, 'accent'));
        container.append(after);
    }

    public static getRoot(): HTMLHtmlElement {
        return document.getElementsByTagName('html')[0];
    }
}
