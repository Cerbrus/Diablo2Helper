import { Component, Input } from '@angular/core';

@Component({
    selector: 'ui-tab',
    templateUrl: './ui-tab.component.html',
    styleUrls: ['./ui-tab.component.scss']
})
export class UiTabComponent {
    @Input('tabTitle')
    public title!: string;

    @Input()
    public active = false;
}
