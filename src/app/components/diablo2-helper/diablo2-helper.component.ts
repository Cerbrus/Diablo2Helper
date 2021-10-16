import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import settings from '../../../assets/settings.json';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../services';

@Component({
    selector: 'diablo2helper',
    templateUrl: './diablo2-helper.component.html',
    styleUrls: ['./diablo2-helper.component.scss']
})
export class Diablo2HelperComponent {
    public environment = environment;

    public tabsName = 'index';

    constructor(
        titleService: Title,
        translate: TranslateService,
        private readonly route: ActivatedRoute,
        private readonly storageService: StorageService
    ) {
        translate.setDefaultLang(settings.defaultLanguage);
        translate.use(settings.defaultLanguage);

        translate.get('common.appTitle')
            .subscribe(title => titleService.setTitle(title));

        this.setActiveTabFromRoute();
    }

    private setActiveTabFromRoute(): void {
        const tab = this.route.snapshot.params.tab;
        if (!tab)
            return;

        const activeTabs = this.storageService.get.uiActiveTabs();
        activeTabs[this.tabsName] = tab;
        this.storageService.save.uiActiveTabs(activeTabs);
    }
}
