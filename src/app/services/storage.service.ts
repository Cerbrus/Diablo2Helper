import { Injectable } from '@angular/core';
import { ArrayHelper } from '../helpers';
import { IStorage } from '../interfaces/IStorage';
import { RecordValues } from '../types/helpers';
import { GetValue, SaveValue } from '../types/storage';

@Injectable({ providedIn: 'root' })
export class StorageService {
    private storageKeys: Array<keyof IStorage> = [
        'uiActiveTabs',
        'darkMode',
        'runeSort',
        'runeWordFilters',
        'runeWordSort',
        'runeWordsOwned',
        'runesOwned',
        'uiCollapsibleState'
    ];

    private static defaultValues: IStorage = {
        darkMode: true,
        runeSort: {
            name: { key: 'name', icon: 'alpha' },
            owned: { key: 'owned', icon: 'numericAlt' },
            number: { key: 'number', icon: 'numeric' }
        },
        runeWordFilters: {
            showUnavailable: true,
            showCraftable: true,
            itemTypes: {}
        },
        runeWordSort: {
            name: { key: 'name', icon: 'alpha' },
            runes: { key: 'runes' },
            cLvl: { key: 'cLvl', icon: 'numeric' },
            owned: { key: 'owned', icon: 'numericAlt' }
        },
        runeWordsOwned: {},
        runesOwned: {},
        uiActiveTabs: {},
        uiCollapsibleState: {}
    };

    public get: GetValue<IStorage>;
    public save: SaveValue<IStorage>;

    constructor() {
        this.get = ArrayHelper.toRecord(this.storageKeys,
            (key) => <T extends RecordValues<IStorage>>(): T =>
                StorageService.getItem(key)
        );

        this.save = ArrayHelper.toRecord(this.storageKeys,
            (key) => <T extends RecordValues<IStorage>>(value: T): T =>
                StorageService.saveItem(key, value)
        );
    }

    private static getItem<T>(key: string): T {
        const stored = localStorage.getItem(`d2helper.${key}`);

        if (stored === undefined || stored === null) {
            const defaultValue = this.defaultValues[key as keyof IStorage];

            if (defaultValue !== undefined && defaultValue !== null)
                return this.saveItem(key, defaultValue as T);
        }

        return stored ? JSON.parse(stored) : null;
    }

    private static saveItem<T>(key: string, value: T): T {
        localStorage.setItem(`d2helper.${key}`, JSON.stringify(value));
        return value;
    }
}
