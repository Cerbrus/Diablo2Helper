import { AfterContentInit, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITab } from '../../interfaces/ui';
import { StorageService } from '../../services';

@Component({
    selector: 'ui-tabs',
    templateUrl: './ui-tabs.component.html',
    styleUrls: ['./ui-tabs.component.scss']
})
export class UiTabsComponent implements AfterContentInit {
    @Input()
    public name!: string;

    @Input('tabs')
    tabsConfig!: Array<ITab>;

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
            this.tabsConfig.forEach(t => t.options.active = t.options.key === activeTabKey);
        }
        const activeTabs = this.tabsConfig.filter(tab => tab.options.active ?? false);
        if (activeTabs.length === 0)
            this.selectTab(this.tabsConfig[0]);
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

    public selectTab(tab: ITab, $event?: MouseEvent): void {
        $event?.preventDefault();
        if (!tab)
            return;

        this.tabsConfig.forEach(tab => tab.options.active = false);
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
