// noinspection JSRemoveUnnecessaryParentheses

import { Injectable } from '@angular/core';
import settings from '../../assets/settings.json';
import { environment } from '../../environments/environment';
import { ArrayHelper, ObjectHelper } from '../helpers';
import { IStorage } from '../interfaces';
import { GetValue, RemoveValue, SaveValue } from '../types/storage';

@Injectable({ providedIn: 'root' })
export class StorageService {
    constructor() {
        this.checkStoredVersion();
    }

    private checkStoredVersion(): void {
        const currentVersion = environment.appVersion;
        const storedVersion = this.get.appVersion();

        if (storedVersion === currentVersion)
            return;

        this.storageKeys
            .filter(key => !this.persistentStorageKeys.includes(key))
            .forEach(key => {
                this.remove[key]();
            });
        
        this.save.appVersion(currentVersion);
    }

    private readonly defaultValues: IStorage = <IStorage>settings.storageDefaults;

    private readonly storageKeys: Array<keyof IStorage> = [
        'appVersion',
        'darkMode',
        'gemsOwned',
        'runeSort',
        'runeWordFilters',
        'runeWordSort',
        'runeWordsOwned',
        'runesOwned',
        'settings',
        'uiActiveTabs',
        'uiCollapsibleState'
    ];

    private readonly persistentStorageKeys: Array<keyof IStorage> = [
        'darkMode',
        'gemsOwned',
        'runeWordsOwned',
        'runesOwned'
    ];

    public readonly get: GetValue<IStorage> = ArrayHelper
        .toRecord(this.storageKeys, key => <T>(): T => this.getItem(key));

    public readonly save: SaveValue<IStorage> = ArrayHelper
        .toRecord(this.storageKeys, key => <T>(value: T): T => this.saveItem(key, value));

    public readonly remove: RemoveValue<IStorage> = ArrayHelper
        .toRecord(this.storageKeys, key => (): void => this.removeItem(key));

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

    // noinspection JSMethodCanBeStatic
    private removeItem(key: string): void {
        localStorage.removeItem(`d2helper.${key}`);
    }
}
