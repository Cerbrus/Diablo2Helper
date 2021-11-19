import { Injectable } from '@angular/core';
import { IItem } from '@dschu012/d2s/lib/d2/types';
import { RuneWordFactory } from '~factories/runeword.factory';
import { CraftableHelper } from '~helpers/craftable.helper';
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
        const result = this.itemsArray.find(
            runeWord => ArrayHelper.toArray(runeWord.craft?.runes)?.join('|') === runesString
        );
        return result ?? null;
    }

    public getItem(rune: TRuneWord): IRuneWord {
        return this.items[rune];
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
                owned: this.sortByOwned.bind(this),
                name: this.sortByName.bind(this),
                cLvl: this.sortByCLvl.bind(this),
                runes: this.sortByCraft.bind(this),
                craft: this.sortByCraftable.bind(this),
                effect: this.sortByEffect.bind(this)
            },
            <TRuneWordSortKeys>'name',
            changedSort
        );

        this.storageService.save.runeWordSort(this.entitySort);
    }

    public sortByName(a: IRuneWord, b: IRuneWord, asc: boolean): number {
        return a.name.localeCompare(b.name) * (asc ? 1 : -1);
    }

    public sortByCraft(a: IRuneWord, b: IRuneWord, asc: boolean): number {
        return this.sortBy(a, b, asc, x => x.craft?.runes?.length ?? 0);
    }

    public sortByCLvl(a: IRuneWord, b: IRuneWord, asc: boolean): number {
        return this.sortBy(a, b, asc, x => x.cLvl);
    }

    public sortByOwned(a: IRuneWord, b: IRuneWord, asc: boolean): number {
        return this.sortBy(a, b, asc, x => x.owned ?? 0);
    }

    public sortByEffect(a: IRuneWord, b: IRuneWord, asc: boolean): number {
        return this.sortBy(a, b, asc, x => ArrayHelper.toArray(x.effects).length);
    }

    public sortByCraftable(a: IRuneWord, b: IRuneWord, asc: boolean): number {
        return CraftableHelper.sortByCraftable(a, b, asc) || this.sortByName(a, b, asc);
    }

    private sortBy(a: IRuneWord, b: IRuneWord, asc: boolean, getValue: (runeWord: IRuneWord) => number) {
        const [numA, numB] = [a, b].map(getValue);
        return (numA - numB) * (asc ? -1 : 1) || this.sortByName(a, b, asc);
    }
}
