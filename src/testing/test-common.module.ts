import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app/app.module';
import { LogMissingTranslationHandler } from '../app/handlers/log-missing-translations.handler';

@NgModule({
    imports: [
        // All repeated modules
        HttpClientModule,
        RouterTestingModule,
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
    exports: [
        TranslatePipe
    ]
})
export class TestModule {
}
