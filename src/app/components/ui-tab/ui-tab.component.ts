import { Component, Input } from '@angular/core';
import { ITabOptions } from '../../interfaces/ui';

@Component({
    selector: 'ui-tab',
    templateUrl: './ui-tab.component.html',
    styleUrls: ['./ui-tab.component.scss']
})
export class UiTabComponent {
    @Input()
    public options!: ITabOptions;
}
