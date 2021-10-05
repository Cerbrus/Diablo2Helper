import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'ui-table-head',
    templateUrl: './ui-table-head.component.html',
    styleUrls: ['./ui-table-head.component.scss']
})
export class UiTableHeadComponent {
    @Input()
    public key!: string;

    @Input()
    public label!: string;

    @HostBinding('class')
    public get cssClass(): string {
        return `header-${this.key}`;
    }
}
