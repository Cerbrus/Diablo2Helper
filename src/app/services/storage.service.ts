// noinspection JSRemoveUnnecessaryParentheses

import { Injectable } from '@angular/core';
import { environment } from '~environment';
import { ArrayHelper, Helper } from '~helpers';
import { IStorage } from '~interfaces';
import settings from '~settings';
import { GetValue, RemoveValue, SaveValue } from '~types/storage';

@Injectable({ providedIn: 'root' })
export class StorageService {
    private readonly defaultValues: IStorage = <IStorage>settings.storageDefaults;

    private readonly storageCache: Partial<IStorage> = {};

    private readonly storageKeys: Array<keyof IStorage> = [
        'appVersion',
        'darkMode',
        'gemsOwned',
        'runeSort',
        'runeWordFilters',
        'runeWordSort',
        'runeWordsFavorited',
        'runeWordsOwned',
        'runesOwned',
        'settings',
        'uiActiveTabs',
        'uiCollapsibleState'
    ];

    public readonly get: GetValue<IStorage> = ArrayHelper.toRecord(
        this.storageKeys,
        key =>
            <T>(): T =>
                this.getItem(key)
    );

    public readonly getDefault: GetValue<IStorage> = ArrayHelper.toRecord(
        this.storageKeys,
        key =>
            <T>(): T =>
                <T>this.defaultValues[key]
    );

    public readonly save: SaveValue<IStorage> = ArrayHelper.toRecord(
        this.storageKeys,
        key =>
            <T>(value: T): T =>
                this.saveItem(key, value)
    );

    public readonly remove: RemoveValue<IStorage> = ArrayHelper.toRecord(
        this.storageKeys,
        key => (): void => this.removeItem(key)
    );

    private readonly persistentStorageKeys: Array<keyof IStorage> = [
        'darkMode',
        'gemsOwned',
        'runeWordsOwned',
        'runeWordsFavorited',
        'runesOwned'
    ];

    constructor() {
        this.checkStoredVersion();
    }

    private checkStoredVersion(): void {
        const currentVersion = environment.appVersion;
        const storedVersion = this.get.appVersion();

        if (storedVersion === currentVersion) return;

        this.storageKeys
            .filter(key => !this.persistentStorageKeys.includes(key))
            .forEach(key => {
                this.remove[key]();
            });

        this.save.appVersion(currentVersion);
    }

    private getItem<T extends IStorage[TKey], TKey extends keyof IStorage>(key: TKey): T {
        if (Helper.hasValue(this.storageCache[key])) return <T>this.storageCache[key];

        const stored = localStorage.getItem(`d2helper.${key}`);

        if (!Helper.hasValue(stored)) {
            const defaultValue = this.defaultValues[key];

            if (Helper.hasValue(defaultValue)) return this.saveItem(key, <T>defaultValue);
        }

        if (stored) {
            const value = JSON.parse(stored);
            this.storageCache[key] = value;
            return value;
        }

        return <T>null;
    }

    // noinspection JSMethodCanBeStatic
    private saveItem<T extends IStorage[TKey], TKey extends keyof IStorage>(key: TKey, value: T): T {
        localStorage.setItem(`d2helper.${key}`, JSON.stringify(value));
        this.storageCache[key] = value;
        return value;
    }

    // noinspection JSMethodCanBeStatic
    private removeItem(key: string): void {
        localStorage.removeItem(`d2helper.${key}`);
    }
}
