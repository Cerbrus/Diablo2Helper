import { Injectable } from '@angular/core';
import { ArrayHelper } from '../helpers';
import { IStorage } from '../interfaces/IStorage';
import { ItemOrLambda, RecordValues, Returns } from '../types/helpers';
import { GetValue, SaveValue } from '../types/storage';

@Injectable({ providedIn: 'root' })
export class StorageService {
    private storageKeys: Array<keyof IStorage> = [
        'activeTabs',
        'darkMode',
        'runeSort',
        'runeWordFilters',
        'runeWordSort',
        'runeWordsOwned',
        'runesOwned',
        'uiCollapsibleState'
    ];

    public get: GetValue<IStorage>;
    public save: SaveValue<IStorage>;

    constructor() {
        this.get = ArrayHelper.toRecord(this.storageKeys,
            (key) => <T extends RecordValues<IStorage>>(defaultValue?: ItemOrLambda<T>): T =>
                StorageService.getItem(key, defaultValue)
        );

        this.save = ArrayHelper.toRecord(this.storageKeys,
            (key) => <T extends RecordValues<IStorage>>(value: T): T =>
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
