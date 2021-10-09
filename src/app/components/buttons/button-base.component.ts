import { Component, HostListener } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';

@Component({ template: '' })
export abstract class ButtonBaseComponent {
    public abstract icon: IconDefinition;

    @HostListener('click', ['$event'])
    public click($event: MouseEvent): void {
        this.onClick($event);
    }

    protected abstract onClick($event: MouseEvent): void;
}
