import { Component, Input } from '@angular/core';
import { ITabOptions } from '../../interfaces/ui';

@Component({
    selector: 'ui-tab',
    templateUrl: './ui-tab.component.html',
    styleUrls: ['./ui-tab.component.scss']
})
export class UiTabComponent {
    private defaultOptions: Omit<ITabOptions, 'title' | 'key'> = {
        active: false,
        fillHeight: true,
        right: false
    };

    @Input()
    public get options(): ITabOptions {
        return this.tabOptions;
    }

    public set options(value: ITabOptions) {
        this.tabOptions = { ...this.defaultOptions, ...value };
    }

    public tabOptions!: ITabOptions;
}
