import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ArrayHelper, RuneHelper, RuneWordHelper } from '~helpers';
import { IRune } from '~interfaces/rune';
import { IRuneWord } from '~interfaces/runeWord';
import { ITable, ITableHeader } from '~interfaces/ui';
import { faHeartOutline, faHeartSolid } from '~modules/font-awesome';
import { RuneTrackerService, RunewordFilterService, StorageService } from '~services';
import { TItem } from '~types';
import { ItemOrArray } from '~types/helpers';
import { TRune } from '~types/rune';
import { TRuneWordSort } from '~types/runeWord';

@Component({
    selector: 'list-rune-words',
    templateUrl: './list-rune-words.component.html',
    styleUrls: ['./list-rune-words.component.scss']
})
export class ListRuneWordsComponent {
    public heartSolid = faHeartSolid;
    public heartOutline = faHeartOutline;

    public get runeWordArraySorted(): Array<IRuneWord> {
        return this.runeWordHelper.itemsArraySorted;
    }

    public get runeWordSort(): TRuneWordSort {
        return this.runeWordHelper.entitySort;
    }

    public headers: Array<ITableHeader<TRuneWordSort, IRuneWord>> = [
        { title: 'labels.owned', key: 'owned', width: 80 },
        { title: 'common.rune', key: 'name' },
        { title: 'common.runes', key: 'runes' },
        { title: 'labels.effect', key: 'cLvl' }
    ];

    constructor(
        private readonly runeHelper: RuneHelper,
        private readonly runeTracker: RuneTrackerService,
        private readonly runeWordHelper: RuneWordHelper,
        private readonly runewordFilterService: RunewordFilterService,
        private readonly storageService: StorageService,
        private readonly translate: TranslateService
    ) {}

    public applySort(changedSort?: ITable<IRuneWord>): void {
        this.runeWordHelper.applySort(changedSort);
    }

    public runeNames(runes: Array<TRune | IRune>): string {
        return runes.map(rune => this.runeHelper.asType(rune)).join('');
    }

    public runes(runes: Array<TRune | IRune>): Array<IRune> {
        return runes.map(rune => this.runeHelper.asItem(rune));
    }

    public showRuneWord(runeWord: IRuneWord): boolean {
        return this.runewordFilterService.canShowRuneWord(runeWord);
    }

    public areRunesOwned(runeWord: IRuneWord): boolean {
        if (!runeWord.craft?.runes) return true;
        const runes = ArrayHelper.toArray(runeWord.craft?.runes);
        return runes && this.runeTracker.areRunesOwned(runes);
    }

    public canCraftRunes(runeWord: IRuneWord): boolean {
        return this.runewordFilterService.canCraftRunes(runeWord.name);
    }

    public runeWordOwned(runeWord: IRuneWord, amount?: number): void {
        if (amount) runeWord.owned = amount;
        this.runeWordHelper.saveEntitiesOwned();
    }

    public formatItemTypes(itemTypes: ItemOrArray<TItem>): string {
        const { clone, toArray } = ArrayHelper;
        const typeNames = clone(toArray(itemTypes));

        const all = typeNames[0] === 'all';
        if (all) typeNames.shift();

        const translated = typeNames.map(t => {
            if (t === 'all')
                throw new Error('Configuration error. Type "all" should be the first entry int the types array.');
            return this.translateItemType(t);
        });
        const single = translated.length === 1;
        const lastType = single ? '' : translated.pop();
        const types = translated.join(', ');

        const translatedTypes = single ? types : this.translateItemType('plural', { types: types, lastType });

        return all ? this.translateItemType('all', { types: translatedTypes, lastType }) : translatedTypes;
    }

    private translateItemType(itemType: TItem | 'single' | 'plural', params?: object): string {
        return this.translate.instant(`itemTypes.${itemType}`, params);
    }

    public toggleFavorite(runeWord: IRuneWord): void {
        runeWord.favorite = !runeWord.favorite;
        this.storageService.save.runeWordsFavorited(
            this.runeWordHelper.itemsArray.filter(rw => rw.favorite).map(rw => rw.name)
        );
    }
}
