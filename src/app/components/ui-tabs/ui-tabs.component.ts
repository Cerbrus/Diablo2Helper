import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { StorageService } from '../../services';
import { UiTabComponent } from '../ui-tab/ui-tab.component';

@Component({
    selector: 'ui-tabs',
    templateUrl: './ui-tabs.component.html',
    styleUrls: ['./ui-tabs.component.scss']
})
export class UiTabsComponent implements AfterContentInit {
    @ContentChildren(UiTabComponent)
    public tabs!: QueryList<UiTabComponent>;

    @Input()
    public name!: string;

    constructor(
        private readonly storageService: StorageService
    ) {
    }

    public ngAfterContentInit(): void {
        const activeTabTitle = this.getActiveTabs()[this.name];
        if (activeTabTitle) {
            this.tabs.forEach(t => t.active = t.title === activeTabTitle);
        }
        const activeTabs = this.tabs.filter((tab) => tab.active);
        if (activeTabs.length === 0)
            this.selectTab(this.tabs.first);
    }

    public selectTab(tab: UiTabComponent): void {
        this.tabs.toArray().forEach(tab => tab.active = false);
        tab.active = true;

        const activeTabs = this.getActiveTabs();
        activeTabs[this.name] = tab.title;
        this.storageService.save.uiActiveTabs(activeTabs);
    }

    private getActiveTabs(): Record<string, string> {
        return this.storageService.get.uiActiveTabs();
    }
}
