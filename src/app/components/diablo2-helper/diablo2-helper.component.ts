import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '~environment';
import { ITab } from '~interfaces/ui';
import settings from '~settings';
import {
    TabPaneCharacterImportComponent,
    TabPaneDevComponent,
    TabPaneGemsComponent,
    TabPaneRunesComponent,
    TabPaneRuneWordsComponent,
    TabPaneSettingsComponent
} from '../-tab-pane';

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
            options: { title: 'common.runeWords', key: 'runewords', shortcutKey: 'w' },
            cssClass: 'runeWords'
        },
        {
            component: TabPaneRunesComponent,
            options: { title: 'common.runes', key: 'runes', shortcutKey: 'r' }
        },
        {
            component: TabPaneGemsComponent,
            options: { title: 'common.gems', key: 'gems', shortcutKey: 'g' }
        },
        {
            component: TabPaneCharacterImportComponent,
            options: { title: 'labels.import', key: 'import', shortcutKey: 'i', fillHeight: false }
        },
        {
            component: TabPaneSettingsComponent,
            options: { title: 'settings.title', key: 'settings', shortcutKey: 's', right: true, fillHeight: false }
        },
        {
            component: TabPaneDevComponent,
            options: { title: 'labels.dev', key: 'dev', shortcutKey: 'd', right: true, fillHeight: false },
            hide: this.environment.production
        }
    ];

    constructor(titleService: Title, translate: TranslateService) {
        translate.setDefaultLang(settings.defaultLanguage);
        translate.use(settings.defaultLanguage);
        translate.get('common.appTitle').subscribe(title => titleService.setTitle(title));
    }
}
