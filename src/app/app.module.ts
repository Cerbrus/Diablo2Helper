// Angular modules
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// External modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ResizeObserverModule } from '@ng-web-apis/resize-observer';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NG_EVENT_PLUGINS } from '@tinkoff/ng-event-plugins';

// Environment
import { environment } from '../environments/environment';

// Components
import { InputCheckboxComponent, InputGameSaveFileComponent, InputNumberCheckboxComponent } from './components/-input';
import {
    ListGemsComponent,
    ListRunesComponent,
    ListRuneWordsComponent,
    ListRuneWordsFiltersComponent
} from './components/-list';
import {
    TabPaneCharacterImportComponent,
    TabPaneDevComponent,
    TabPaneGemsComponent,
    TabPaneRunesComponent,
    TabPaneRuneWordsComponent,
    TabPaneSettingsComponent
} from './components/-tab-pane';
import {
    UiCollapsibleComponent,
    UiFormatEffectComponent,
    UiScrollableComponent,
    UiSpriteAnimatedComponent,
    UiSpriteClassComponent,
    UiSpriteGemComponent,
    UiSpriteRuneComponent,
    UiSpriteSkillComponent,
    UiTabComponent,
    UiTableHeadComponent,
    UiTableRecordComponent,
    UiTableSortControlComponent,
    UiTabsComponent
} from './components/-ui';
import { AppComponent } from './components/app/app.component';
import { Diablo2HelperComponent } from './components/diablo2-helper/diablo2-helper.component';
import { ReportIssueComponent } from './components/report-issue/report-issue.component';
import { RuneCounterComponent } from './components/rune-counter/rune-counter.component';
import { RuneTrackingCountersComponent } from './components/rune-tracking-counters/rune-tracking-counters.component';
import { RuneTrackingSelectComponent } from './components/rune-tracking-select/rune-tracking-select.component';

// Directives
import { DraggableDirective, OnClickSelectDirective, TooltipSocketableDirective, VarDirective } from './directives';

// Handlers
import { LogMissingTranslationHandler } from './handlers/log-missing-translations.handler';

// Pipes
import { AsArrayPipe, KeyValueTypedPipe } from './pipes';

// Modules
import { RoutingModule } from './routing/routing.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', `.json?v=${environment.appVersion}`);
}

const components = [
    AppComponent,
    Diablo2HelperComponent,
    InputCheckboxComponent,
    InputGameSaveFileComponent,
    InputNumberCheckboxComponent,
    ListGemsComponent,
    ListRuneWordsComponent,
    ListRuneWordsFiltersComponent,
    ListRunesComponent,
    ReportIssueComponent,
    RuneCounterComponent,
    RuneTrackingCountersComponent,
    RuneTrackingSelectComponent,
    TabPaneCharacterImportComponent,
    TabPaneDevComponent,
    TabPaneGemsComponent,
    TabPaneRuneWordsComponent,
    TabPaneRunesComponent,
    TabPaneSettingsComponent,
    UiCollapsibleComponent,
    UiFormatEffectComponent,
    UiScrollableComponent,
    UiSpriteAnimatedComponent,
    UiSpriteClassComponent,
    UiSpriteGemComponent,
    UiSpriteRuneComponent,
    UiSpriteSkillComponent,
    UiTabComponent,
    UiTableHeadComponent,
    UiTableRecordComponent,
    UiTableSortControlComponent,
    UiTabsComponent
];

const directives = [
    DraggableDirective,
    OnClickSelectDirective,
    TooltipSocketableDirective,
    VarDirective
];

const pipes = [
    AsArrayPipe,
    KeyValueTypedPipe
];

@NgModule({
    declarations: [
        components,
        directives,
        pipes
    ],
    imports: [
        BrowserModule,
        FontAwesomeModule,
        FormsModule,
        HttpClientModule,
        ResizeObserverModule,
        RoutingModule,
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
    providers: [NG_EVENT_PLUGINS],
    bootstrap: [AppComponent],
    entryComponents: [AppComponent]
})
export class AppModule {
}


