import { Renderer2 } from '@angular/core';

export class DomHelper {
    public static empty(element: HTMLElement, renderer: Renderer2): void {
        let child = element.lastElementChild;
        while (child) {
            renderer.removeChild(element, child);
            child = element.lastElementChild;
        }
    }
}
