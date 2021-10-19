import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import {
    TabPaneCharacterImportComponent,
    TabPaneDevComponent,
    TabPaneGemsComponent,
    TabPaneRunesComponent,
    TabPaneRuneWordsComponent,
    TabPaneSettingsComponent
} from '../-tab-pane';
import settings from '../../../assets/settings.json';
import { environment } from '../../../environments/environment';
import { ITab } from '../../interfaces/ui';

@Component({
    selector: 'diablo2helper',
    templateUrl: './diablo2-helper.component.html',
    styleUrls: ['./diablo2-helper.component.scss']
})
export class Diablo2HelperComponent {
    public environment = environment;

    public tabs: Array<ITab> = [
        {
            component: TabPaneRuneWordsComponent,
            options: { title: 'common.runeWords', key: 'runewords' },
            cssClass: 'runeWords'
        },
        {
            component: TabPaneRunesComponent,
            options: { title: 'common.runes', key: 'runes' }
        },
        {
            component: TabPaneGemsComponent,
            options: { title: 'common.gems', key: 'gems' }
        },
        {
            component: TabPaneCharacterImportComponent,
            options: { title: 'labels.import', key: 'import', fillHeight: false }
        },
        {
            component: TabPaneSettingsComponent,
            options: { title: 'settings.title', key: 'settings', right: true, fillHeight: false }
        },
        {
            component: TabPaneDevComponent,
            options: { title: 'labels.dev', key: 'dev', right: true, fillHeight: false },
            hide: this.environment.production
        }
    ];

    constructor(
        titleService: Title,
        translate: TranslateService
    ) {
        translate.setDefaultLang(settings.defaultLanguage);
        translate.use(settings.defaultLanguage);

        translate.get('common.appTitle')
            .subscribe(title => titleService.setTitle(title));
    }
}
