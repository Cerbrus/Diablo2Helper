import { Injectable } from '@angular/core';
import { IItem } from '@dschu012/d2s/lib/d2/types';
import { RuneWordFactory } from '~factories/runeword.factory';
import { IRuneWord, IRuneWordMap } from '~interfaces/runeWord';
import { ITable } from '~interfaces/ui';
import { StorageService } from '~services';
import { RuneWords, TRuneWord, TRuneWordSort, TRuneWordSortKeys } from '~types/runeWord';
import { BaseEntitiesHelper } from './base-entities.helper';
import { GemHelper } from './gem.helper';
import { RuneHelper } from './rune.helper';
import { ArrayHelper } from './ts';

@Injectable({ providedIn: 'root' })
export class RuneWordHelper extends BaseEntitiesHelper<IRuneWordMap, TRuneWord, IRuneWord, TRuneWordSort> {
    constructor(
        runeWordFactory: RuneWordFactory,
        private readonly runeHelper: RuneHelper,
        private readonly gemHelper: GemHelper,
        private readonly storageService: StorageService
    ) {
        super(runeWordFactory);

        this.entitySort = this.storageService.get.runeWordSort();
        this.applySort();
    }

    public fromSaveItem(item: IItem): IRuneWord | null {
        const runesString = item.socketed_items.map(i => this.runeHelper.fromSaveItem(i)?.name).join('|');
        return this.itemsArray.find(runeWord => runeWord.runes.join('|') === runesString) ?? null;
    }

    public getItem(rune: TRuneWord): IRuneWord {
        return this.getItems()[rune];
    }

    public isItem(item: object | IRuneWord | TRuneWord): item is IRuneWord {
        return typeof item !== 'string' && 'itemTypes' in item;
    }

    public isType(item: object | IRuneWord | TRuneWord): item is TRuneWord {
        return typeof item === 'string' && RuneWords.includes(item);
    }

    public getType(item: TRuneWord | IRuneWord): TRuneWord {
        return this.asItem(item).name;
    }

    public saveEntitiesOwned(): void {
        const owned = ArrayHelper.toRecordWithKey(
            this.itemsArray.filter(runeWord => runeWord.owned),
            runeWord => runeWord.name,
            runeWord => runeWord.owned!
        );
        this.storageService.save.runeWordsOwned(owned);
    }

    public applySort(changedSort?: ITable<IRuneWord>): void {
        this.applyChangedSort(
            {
                name: this.sortByName.bind(this),
                runes: this.sortByRunes.bind(this),
                cLvl: this.sortByCLvl.bind(this),
                owned: this.sortByOwned.bind(this)
            },
            <TRuneWordSortKeys>'name',
            changedSort
        );

        this.storageService.save.runeWordSort(this.entitySort);
    }

    public sortByName(a: IRuneWord, b: IRuneWord, asc: boolean): number {
        return a.name.localeCompare(b.name) * (asc ? 1 : -1);
    }

    public sortByRunes(a: IRuneWord, b: IRuneWord, asc: boolean): number {
        return a.runes.length === b.runes.length
            ? this.sortByCLvl(a, b, asc)
            : (a.runes.length - b.runes.length) * (asc ? -1 : 1);
    }

    public sortByCLvl(a: IRuneWord, b: IRuneWord, asc: boolean): number {
        return a.cLvl === b.cLvl ? this.sortByName(a, b, asc) : (a.cLvl - b.cLvl) * (asc ? 1 : -1);
    }

    public sortByOwned(a: IRuneWord, b: IRuneWord, asc: boolean): number {
        return a.owned === b.owned ? this.sortByName(a, b, asc) : ((a.owned ?? 0) - (b.owned ?? 0)) * (asc ? -1 : 1);
    }
}
