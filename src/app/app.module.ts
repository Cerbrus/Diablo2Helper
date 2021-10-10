import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';

// Components
import { Diablo2HelperComponent } from './components/diablo2-helper/diablo2-helper.component';
import { FormatEffectComponent } from './components/format-effect/format-effect.component';
import { InputCheckboxComponent } from './components/input-checkbox/input-checkbox.component';
import { InputGameSaveFileComponent } from './components/input-game-save-file/input-game-save-file.component';
import { InputNumberCheckboxComponent } from './components/input-number-checkbox/input-number-checkbox.component';
import { ListGemsComponent } from './components/list-gems/list-gems.component';
import { ListRuneWordsFiltersComponent } from './components/list-rune-words-filters/list-rune-words-filters.component';
import { ListRuneWordsComponent } from './components/list-rune-words/list-rune-words.component';
import { ListRunesComponent } from './components/list-runes/list-runes.component';
import { RuneCounterComponent } from './components/rune-counter/rune-counter.component';
import { RuneTrackingCountersComponent } from './components/rune-tracking-counters/rune-tracking-counters.component';
import { RuneTrackingSelectComponent } from './components/rune-tracking-select/rune-tracking-select.component';
import { TabPaneCharacterImportComponent } from './components/tab-pane-character-import/tab-pane-character-import.component';
import { TabPaneGemsComponent } from './components/tab-pane-gems/tab-pane-gems.component';
import { TabPaneRuneWordsComponent } from './components/tab-pane-rune-words/tab-pane-rune-words.component';
import { TabPaneRunesComponent } from './components/tab-pane-runes/tab-pane-runes.component';
import { TabPaneSettingsComponent } from './components/tab-pane-settings/tab-pane-settings.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { UiCollapsibleComponent } from './components/ui-collapsible/ui-collapsible.component';
import { UiSpriteGemComponent } from './components/ui-sprite-gem/ui-sprite-gem.component';
import { UiSpriteRuneComponent } from './components/ui-sprite-rune/ui-sprite-rune.component';
import { UiSpriteComponent } from './components/ui-sprite/ui-sprite.component';
import { UiTabComponent } from './components/ui-tab/ui-tab.component';
import { UiTableHeadComponent } from './components/ui-table-head/ui-table-head.component';
import { UiTableRecordComponent } from './components/ui-table-record/ui-table-record.component';
import { UiTableSortControlComponent } from './components/ui-table-sort-control/ui-table-sort-control.component';
import { UiTabsComponent } from './components/ui-tabs/ui-tabs.component';

// Directives
import { OnClickSelectDirective } from './directives/on-click-select/on-click-select.directive';
import { TooltipSocketableDirective } from './directives/tooltip-socketable/tooltip-socketable.directive';
import { VarDirective } from './directives/var/var.directive';

// Handlers
import { LogMissingTranslationHandler } from './handlers/log-missing-translations.handler';

// Pipes
import { AsArrayPipe } from './pipes/as-array.pipe';
import { KeyValueTypedPipe } from './pipes/key-value-typed.pipe';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', `.json?v=${environment.appVersion}`);
}

const directives = [
    OnClickSelectDirective,
    TooltipSocketableDirective,
    VarDirective
];
const pipes = [
    AsArrayPipe,
    KeyValueTypedPipe
];
const components = [
    Diablo2HelperComponent,
    FormatEffectComponent,
    InputCheckboxComponent,
    InputGameSaveFileComponent,
    InputNumberCheckboxComponent,
    ListGemsComponent,
    ListRuneWordsComponent,
    ListRuneWordsFiltersComponent,
    ListRunesComponent,
    RuneCounterComponent,
    RuneTrackingCountersComponent,
    RuneTrackingSelectComponent,
    TabPaneCharacterImportComponent,
    TabPaneGemsComponent,
    TabPaneRuneWordsComponent,
    TabPaneRunesComponent,
    TabPaneSettingsComponent,
    ThemeSwitcherComponent,
    UiCollapsibleComponent,
    UiSpriteComponent,
    UiSpriteGemComponent,
    UiSpriteRuneComponent,
    UiTabComponent,
    UiTableHeadComponent,
    UiTableRecordComponent,
    UiTableSortControlComponent,
    UiTabsComponent
];

@NgModule({
    declarations: [
        directives,
        pipes,
        components
    ],
    imports: [
        BrowserModule,
        FontAwesomeModule,
        FormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            missingTranslationHandler: {
                provide: MissingTranslationHandler,
                useClass: LogMissingTranslationHandler
            },
            useDefaultLang: true
        })
    ],
    providers: [],
    bootstrap: [Diablo2HelperComponent],
    entryComponents: [Diablo2HelperComponent]
})
export class AppModule {
}


