import { Injectable } from '@angular/core';
import { ArrayHelper } from '../helpers';
import { IRuneWordFilters } from '../interfaces/runeWord';
import { ItemOrLambda, RecordValues, Returns } from '../types/helpers';
import { TRune, TRuneSort } from '../types/rune';
import { TRuneWord, TRuneWordSort } from '../types/runeWord';
import { GetValue, SaveValue } from '../types/storage';

interface IStorageService {
    darkMode: boolean;
    runeSort: TRuneSort;
    runeWordFilters: IRuneWordFilters;
    runeWordSort: TRuneWordSort;
    runeWordsOwned: Partial<Record<TRuneWord, number>>;
    runesOwned: Partial<Record<TRune, number>>;
    uiCollapsibleState: Partial<Record<string, boolean>>;
}

@Injectable({ providedIn: 'root' })
export class StorageService {
    private storageKeys: Array<keyof IStorageService> = [
        'darkMode',
        'runeSort',
        'runeWordFilters',
        'runeWordSort',
        'runeWordsOwned',
        'runesOwned',
        'uiCollapsibleState'
    ];

    public get: GetValue<IStorageService>;
    public save: SaveValue<IStorageService>;

    constructor() {
        this.get = ArrayHelper.toRecord(this.storageKeys,
            (key) => <T extends RecordValues<IStorageService>>(defaultValue?: ItemOrLambda<T>): T =>
                StorageService.getItem(key, defaultValue)
        );

        this.save = ArrayHelper.toRecord(this.storageKeys,
            (key) => <T extends RecordValues<IStorageService>>(value: T): T =>
                StorageService.saveItem(key, value)
        );
    }

    private static getItem<T>(key: string, defaultValue?: ItemOrLambda<T>): T {
        const stored = localStorage.getItem(`d2helper.${key}`);

        if ((stored === undefined || stored === null) &&
            defaultValue !== undefined &&
            defaultValue !== null) {
            return this.saveItem(key,
                typeof defaultValue === 'function'
                    ? (defaultValue as Returns<T>)()
                    : defaultValue);
        }

        return stored ? JSON.parse(stored) : null;
    }

    private static saveItem<T>(key: string, value: T): T {
        localStorage.setItem(`d2helper.${key}`, JSON.stringify(value));
        return value;
    }
}
