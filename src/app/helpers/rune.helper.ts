import { Injectable } from '@angular/core';
import { IItem } from '@dschu012/d2s/lib/d2/types';
import { RuneFactory } from '../factories/rune.factory';
import { ITable } from '../interfaces';
import { IGem } from '../interfaces/gem';
import { IRune, IRuneMap } from '../interfaces/rune';
import { StorageService } from '../services';
import { TGem } from '../types/gem';
import { Runes, TRune, TRuneSort, TRuneSortKeys } from '../types/rune';
import { BaseEntitiesHelper } from './base-entities.helper';
import { GemHelper } from './gem.helper';
import { ArrayHelper } from './ts';

@Injectable({ providedIn: 'root' })
export class RuneHelper extends BaseEntitiesHelper<IRuneMap, TRune, IRune, TRuneSort> {
    constructor(
        runeFactory: RuneFactory,
        private gemHelper: GemHelper,
        private readonly storageService: StorageService
    ) {
        super(runeFactory);

        this.entitySort = this.storageService.get.runeSort();
        this.applySort();
    }

    public fromSaveItem(item: IItem): IRune | null {
        const number = parseInt(item.type.replace('r', ''), 10);
        return this.itemsArray.find(r => r.number === number) ?? null;
    }

    public getItem(rune: TRune): IRune {
        return this.getItems()[rune];
    }

    public isItem(item: TGem | IGem | TRune | IRune): item is IRune {
        return typeof item !== 'string' && !('quality' in item);
    }

    public isType(item: object | TGem | TRune): item is TRune {
        return typeof item === 'string'
            && !this.gemHelper.isType(item)
            && Runes.includes(item);
    }

    public getType(item: TRune | IRune): TRune {
        return this.asItem(item).name;
    }

    public saveEntitiesOwned(): void {
        const owned = ArrayHelper.toRecordWithKey(
            this.itemsArray.filter(rune => rune.owned),
            rune => rune.name,
            rune => rune.owned!);
        this.storageService.save.runesOwned(owned);
    }

    public applySort(changedSort?: ITable<IRune>): void {
        this.applyChangedSort(
            {
                number: this.sortByNumber.bind(this),
                name: this.sortByName.bind(this),
                owned: this.sortByOwned.bind(this)
            },
            'number' as TRuneSortKeys,
            changedSort);

        this.storageService.save.runeSort(this.entitySort);
    }

    public sortByNumber(a: IRune, b: IRune, asc: boolean): number {
        return (a.number - b.number) * (asc ? 1 : -1);
    }

    public sortByName(a: IRune, b: IRune, asc: boolean): number {
        return a.name.localeCompare(b.name) * (asc ? 1 : -1) ||
            this.sortByNumber(a, b, asc);
    }

    public sortByOwned(a: IRune, b: IRune, asc: boolean): number {
        return a.owned === b.owned
            ? this.sortByNumber(a, b, asc)
            : ((a.owned ?? 0) - (b.owned ?? 0)) * (asc ? -1 : 1);
    }
}
