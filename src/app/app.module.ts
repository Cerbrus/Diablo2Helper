// Angular modules
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// External modules
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NG_EVENT_PLUGINS } from '@tinkoff/ng-event-plugins';

// Components
import { InputCheckboxComponent, InputGameSaveFileComponent, InputNumberCheckboxComponent } from '~components/-input';
import {
    ListGemsComponent,
    ListRunesComponent,
    ListRuneWordsComponent,
    ListRuneWordsFiltersComponent
} from '~components/-list';
import {
    TabPaneCharacterImportComponent,
    TabPaneDevComponent,
    TabPaneGemsComponent,
    TabPaneRunesComponent,
    TabPaneRuneWordsComponent,
    TabPaneSettingsComponent
} from '~components/-tab-pane';
import { AppComponent } from '~components/app/app.component';
import { Diablo2HelperComponent } from '~components/diablo2-helper/diablo2-helper.component';
import { ReportIssueComponent } from '~components/report-issue/report-issue.component';
import { RuneCounterComponent } from '~components/rune-counter/rune-counter.component';
import { RuneTrackingCountersComponent } from '~components/rune-tracking-counters/rune-tracking-counters.component';
import { RuneTrackingSelectComponent } from '~components/rune-tracking-select/rune-tracking-select.component';

// Environment
import { environment } from '~environment';

// Handlers
import { LogMissingTranslationHandler } from '~handlers/log-missing-translations.handler';

// Custom modules
import { RoutingModule, SharedModule, UiModule } from '~modules';

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
    TabPaneSettingsComponent
];

@NgModule({
    declarations: [
        components
    ],
    imports: [
        HttpClientModule,
        RoutingModule,
        UiModule,
        SharedModule,
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


