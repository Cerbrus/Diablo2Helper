import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        private readonly storageService: StorageService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute) {
        this.setActiveTabFromRoute();
    }

    public ngAfterContentInit(): void {
        const activeTabKey = this.getActiveTabs()[this.name];
        if (activeTabKey) {
            this.tabs.forEach(t => t.options.active = t.options.key === activeTabKey);
        }
        const activeTabs = this.tabs.filter(tab => tab.options.active ?? false);
        if (activeTabs.length === 0)
            this.selectTab(this.tabs.first);
    }

    private setActiveTabFromRoute(): void {
        const tab = this.route.snapshot.params.tab;
        if (!tab)
            return;

        const [name, key] = tab.split(':');

        const activeTabs = this.storageService.get.uiActiveTabs();
        activeTabs[name] = key;
        this.storageService.save.uiActiveTabs(activeTabs);
    }

    public selectTab(tab: UiTabComponent, $event?: MouseEvent): void {
        $event?.preventDefault();
        if (!tab)
            return;

        this.tabs.toArray().forEach(tab => tab.options.active = false);
        tab.options.active = true;

        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate(
            [`/${this.name}:${tab.options.key}`],
            {
                relativeTo: this.activatedRoute
            });

        const activeTabs = this.getActiveTabs();
        activeTabs[this.name] = tab.options.key;
        this.storageService.save.uiActiveTabs(activeTabs);
    }

    private getActiveTabs(): Record<string, string> {
        return this.storageService.get.uiActiveTabs();
    }
}
