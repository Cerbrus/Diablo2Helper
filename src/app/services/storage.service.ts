import { Injectable } from '@angular/core';
import settings from '../../assets/settings.json';
import { ArrayHelper } from '../helpers';
import { IStorage } from '../interfaces/IStorage';
import { GetValue, SaveValue } from '../types/storage';

@Injectable({ providedIn: 'root' })
export class StorageService {
    private readonly defaultValues: IStorage = <IStorage>settings.storageDefaults;

    private readonly storageKeys: Array<keyof IStorage> = [
        'uiActiveTabs',
        'darkMode',
        'runeSort',
        'runeWordFilters',
        'runeWordSort',
        'runeWordsOwned',
        'runesOwned',
        'uiCollapsibleState'
    ];

    public readonly get: GetValue<IStorage> = ArrayHelper
        .toRecord(this.storageKeys, (key) => <T>(): T => this.getItem(key));

    public readonly save: SaveValue<IStorage> = ArrayHelper
        .toRecord(this.storageKeys, (key) => <T>(value: T): T => this.saveItem(key, value));

    private getItem<T>(key: string): T {
        const stored = localStorage.getItem(`d2helper.${key}`);

        if (stored === undefined || stored === null) {
            const defaultValue = this.defaultValues[key as keyof IStorage];

            if (defaultValue !== undefined && defaultValue !== null)
                return this.saveItem(key, defaultValue as T);
        }

        return stored ? JSON.parse(stored) : null;
    }

    // noinspection JSMethodCanBeStatic
    private saveItem<T>(key: string, value: T): T {
        localStorage.setItem(`d2helper.${key}`, JSON.stringify(value));
        return value;
    }
}
