import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { UiTabComponent } from '../ui-tab/ui-tab.component';

@Component({
    selector: 'ui-tabs',
    templateUrl: './ui-tabs.component.html',
    styleUrls: ['./ui-tabs.component.scss']
})
export class UiTabsComponent implements AfterContentInit {
    @ContentChildren(UiTabComponent) tabs!: QueryList<UiTabComponent>;

    public ngAfterContentInit(): void {
        let activeTabs = this.tabs.filter((tab) => tab.active);

        if (activeTabs.length === 0)
            this.selectTab(this.tabs.first);
    }

    public selectTab(tab: UiTabComponent): void {
        this.tabs.toArray().forEach(tab => tab.active = false);
        tab.active = true;
    }
}
