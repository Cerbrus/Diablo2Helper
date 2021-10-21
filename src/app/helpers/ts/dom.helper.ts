export class DomHelper {
    public static createElement(tagName: string, childElement: string | Node, className?: string): HTMLElement {
        const element = document.createElement(tagName);
        element.append(childElement);

        if (className) element.classList.add(className);

        return element;
    }

    public static isInput(element: HTMLElement | null): boolean {
        return !!element && ['input', 'textarea'].includes(element.tagName);
    }

    public static isVisible(element: HTMLElement): boolean {
        return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
    }
}
