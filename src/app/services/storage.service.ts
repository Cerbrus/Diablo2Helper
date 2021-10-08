import { Injectable } from '@angular/core';
import settings from '../../assets/settings.json';
import { ArrayHelper, ObjectHelper } from '../helpers';
import { IStorage } from '../interfaces/IStorage';
import { GetValue, SaveValue } from '../types/storage';

@Injectable({ providedIn: 'root' })
export class StorageService {
    private readonly defaultValues: IStorage = <IStorage>settings.storageDefaults;

    private readonly storageKeys: Array<keyof IStorage> = [
        'darkMode',
        'gemsOwned',
        'runeSort',
        'runeWordFilters',
        'runeWordSort',
        'runeWordsOwned',
        'runesOwned',
        'uiActiveTabs',
        'uiCollapsibleState'
    ];

    public readonly get: GetValue<IStorage> = ArrayHelper
        .toRecord(this.storageKeys, (key) => <T>(): T => this.getItem(key));

    public readonly save: SaveValue<IStorage> = ArrayHelper
        .toRecord(this.storageKeys, (key) => <T>(value: T): T => this.saveItem(key, value));

    private getItem<T>(key: string): T {
        const stored = localStorage.getItem(`d2helper.${key}`);

        if (!ObjectHelper.hasValue(stored)) {
            const defaultValue = this.defaultValues[<keyof IStorage>key];

            if (ObjectHelper.hasValue(defaultValue))
                return this.saveItem(key, <T>defaultValue);
        }

        return stored ? JSON.parse(stored) : null;
    }

    // noinspection JSMethodCanBeStatic
    private saveItem<T>(key: string, value: T): T {
        localStorage.setItem(`d2helper.${key}`, JSON.stringify(value));
        return value;
    }
}
