import { DatePipe, KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { ID2S } from '@dschu012/d2s/lib/d2/types';
import { TranslateService } from '@ngx-translate/core';
import { GemHelper, RuneHelper, RuneWordHelper } from '../../helpers';
import { IGem } from '../../interfaces/gem';
import { IRune } from '../../interfaces/rune';
import { IRuneWord } from '../../interfaces/runeWord';
import { RunewordFilterService } from '../../services';
import { D2sParserService } from '../../services/d2s-parser.service';
import { TError } from '../../types';

@Component({
    selector: 'tab-pane-character-import',
    templateUrl: './tab-pane-character-import.component.html',
    styleUrls: ['./tab-pane-character-import.component.scss']
})
export class TabPaneCharacterImportComponent {
    public parseResult?: ID2S;
    public parseError?: TError<any>;

    public character?: Array<KeyValue<string, string | number>>;
    public gems?: Array<KeyValue<IGem, number>>;
    public runes?: Array<KeyValue<IRune, number>>;
    public runeWords?: Array<KeyValue<IRuneWord, number>>;

    public logText?: string;

    constructor(
        private readonly translate: TranslateService,
        private readonly d2sParserService: D2sParserService,
        private readonly gemHelper: GemHelper,
        private readonly runeHelper: RuneHelper,
        private readonly runeWordHelper: RuneWordHelper,
        private readonly runeWordFilterService: RunewordFilterService
    ) {
    }

    public applySaveToFilters(): void {
        if (!this.parseResult || !this.gems || !this.runes || !this.runeWords)
            return;

        this.runeWordFilterService.applySaveToFilters(
            this.parseResult.header.level,
            this.gems,
            this.runes,
            this.runeWords
        );

        this.log('log.appliedSaveToFilters');
    }

    public onParse(result: ID2S | TError<any>): void {
        const resetValues: Array<keyof this> = ['parseError', 'parseResult', 'gems', 'runes', 'runeWords', 'logText'];
        resetValues.forEach(key => delete this[key]);

        if ('error' in result) {
            this.parseError = result;
            this.log('log.parseError');
            return;
        }

        this.parseResult = result;

        const lastPlayed = new DatePipe(this.translate.currentLang)
            .transform(new Date(result.header.last_played * 1000), 'medium') ?? '';

        const gems = result.items.filter(i => i.categories?.includes('Gem'));
        const runes = result.items.filter(i => i.categories?.includes('Rune'));
        const runeWords = result.items.filter(i => i.given_runeword);

        this.gems = this.d2sParserService.getItemCounts(this.gemHelper, gems);
        this.log('log.foundGems', gems);
        this.runes = this.d2sParserService.getItemCounts(this.runeHelper, runes);
        this.log('log.foundRunes', runes);
        this.runeWords = this.d2sParserService.getItemCounts(this.runeWordHelper, runeWords);
        this.log('log.foundRuneWords', runeWords);

        this.character = [
            ['character.name', result.header.name],
            ['character.level', result.header.level],
            ['character.class', result.header.class],
            ['character.lastPlayed', lastPlayed]
        ].map(([key, value]) => ({
            key: this.translate.instant(`${key}`),
            value
        }));
    }

    private log(key: string, interpolateParams?: Object): void {
        this.logText = `${this.logText ?? ''}${this.translate.instant(key, interpolateParams)}\r\n`;
    }
}
