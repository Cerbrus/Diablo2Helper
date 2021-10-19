import { Component, HostBinding, Input } from '@angular/core';
import { LabeledBaseComponent } from '../../../../shared';

@Component({
    selector: 'ui-table-head',
    templateUrl: './ui-table-head.component.html',
    styleUrls: ['./ui-table-head.component.scss']
})
export class UiTableHeadComponent extends LabeledBaseComponent {
    @Input()
    public key!: string;

    @HostBinding('class')
    public get cssClass(): string {
        return `header-${this.key}`;
    }
}
