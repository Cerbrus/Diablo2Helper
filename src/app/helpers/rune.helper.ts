import { Injectable } from '@angular/core';
import { RuneFactory } from '../factories/rune.factory';
import { ITable } from '../interfaces';
import { IGem } from '../interfaces/gem';
import { IRune, IRuneMap } from '../interfaces/rune';
import { StorageService } from '../services';
import { TGem } from '../types/gem';
import { Runes, TRune, TRuneSort, TRuneSortKeys } from '../types/rune';
import { BaseEntitiesHelper } from './base-entities.helper';

@Injectable({ providedIn: 'root' })
export class RuneHelper extends BaseEntitiesHelper<IRuneMap, TRune, IRune, TRuneSort> {
    constructor(
        runeFactory: RuneFactory,
        private readonly storageService: StorageService
    ) {
        super(runeFactory);

        this.entitySort = this.storageService.get.runeSort({
            name: { key: 'name', icon: 'alpha' },
            owned: { key: 'owned', icon: 'numericAlt' },
            number: { key: 'number', icon: 'numeric' }
        });
        this.applySort();
    }

    public getItem(rune: TRune): IRune {
        return this.getItems()[rune];
    }

    public isItem(item: TGem | IGem | TRune | IRune): item is IRune {
        return typeof item !== 'string' && !('quality' in item);
    }

    public isType(item: object | TGem | TRune): item is TRune {
        return typeof item === 'string' && Runes.includes(item);
    }

    public getType(item: TRune | IRune): TRune {
        return this.asItem(item).name;
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
