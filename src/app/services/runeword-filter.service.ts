import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import {
    ArrayHelper,
    BaseEntitiesHelper,
    GemHelper,
    NumberHelper,
    ObjectHelper,
    RuneHelper,
    RuneWordHelper,
    StringHelper
} from '~helpers';
import { IGem } from '~interfaces/gem';
import { IRune } from '~interfaces/rune';
import { IRuneWord, IRuneWordFilters, IRuneWordMap } from '~interfaces/runeWord';
import { TItem } from '~types';
import { RuneWords, TRuneWord } from '~types/runeWord';
import { RuneTrackerService, StorageService } from './';

@Injectable({ providedIn: 'root' })
export class RunewordFilterService {
    public filters: IRuneWordFilters;

    private readonly types: {
        melee: Array<TItem>;
        ranged: Array<TItem>;
        shields: Array<TItem>;
    } = {
        melee: ['axe', 'claw', 'club', 'hammer', 'mace', 'poleArm', 'scepter', 'stave', 'sword', 'wand'],
        ranged: ['bow', 'crossbow'],
        shields: ['shield', 'paladinShield']
    };

    private runeWords: IRuneWordMap;
    private runeWordVisibility: Record<TRuneWord, boolean> = ArrayHelper.toRecord(RuneWords, () => false);

    private craftableRuneSets: Record<string, boolean> = {};

    constructor(
        private readonly storageService: StorageService,
        private readonly gemHelper: GemHelper,
        private readonly runeHelper: RuneHelper,
        private readonly runeWordHelper: RuneWordHelper,
        private readonly runeTracker: RuneTrackerService
    ) {
        this.filters = storageService.get.runeWordFilters();
        this.runeWords = runeWordHelper.getItems();
        this.calculateRuneWordVisibility();
    }

    public applySaveToFilters(
        cLvl: number,
        gems: Array<KeyValue<IGem, number>>,
        runes: Array<KeyValue<IRune, number>>,
        runeWords: Array<KeyValue<IRuneWord, number>>
    ): void {
        this.filters.cLvl = cLvl;

        this.applyOwnedCount(this.gemHelper, gems);
        this.applyOwnedCount(this.runeHelper, runes);
        this.applyOwnedCount(this.runeWordHelper, runeWords);

        this.saveFilters();
    }

    // noinspection JSMethodCanBeStatic
    private applyOwnedCount(
        helper: BaseEntitiesHelper<any, any, any, any>,
        itemCounts: Array<KeyValue<{ owned?: number }, number>>
    ): void {
        helper.itemsArray.forEach(i => {
            i.count = 0;
        });
        itemCounts.forEach(({ key, value }) => {
            key.owned = value;
        });
        helper.saveEntitiesOwned();
    }

    public calculateRuneWordVisibility(): void {
        this.runeWordVisibility = ArrayHelper.toRecord(RuneWords, (runeWord: TRuneWord) =>
            this.applyFilterToRuneWord(runeWord)
        );
    }

    public canShowRuneWord(runeWord: IRuneWord | TRuneWord): boolean {
        return this.runeWordVisibility[this.runeWordHelper.asType(runeWord)];
    }

    public clampClvl(min: number, max: number): void {
        if (this.filters.cLvl) this.filters.cLvl = NumberHelper.clamp(this.filters.cLvl, min, max);

        this.saveFilters();
    }

    public canCraftRunes(runeWord: TRuneWord): boolean {
        return this.craftableRuneSets[runeWord];
    }

    public isMelee(itemType: TItem): boolean {
        return this.types.melee.includes(itemType);
    }

    public isAllMeleeEnabled(): boolean {
        return this.types.melee.every(type => this.filters.itemTypes[type]);
    }

    public isRanged(itemType: TItem): boolean {
        return this.types.ranged.includes(itemType);
    }

    public isAllRangedEnabled(): boolean {
        return this.types.ranged.every(type => this.filters.itemTypes[type]);
    }

    public saveFilters(): void {
        this.calculateRuneWordVisibility();
        this.storageService.save.runeWordFilters(this.filters);
    }

    public updateFilters(itemType: TItem): void {
        const types = this.filters.itemTypes;

        if (itemType === 'weaponsMelee') {
            this.setMelee(types.weaponsMelee);
        } else if (itemType === 'weaponsRanged') {
            this.setRanged(types.weaponsRanged);
        } else if (this.isMelee(itemType)) {
            types.weaponsMelee = this.isAllMeleeEnabled();
        } else if (this.isRanged(itemType)) {
            types.weaponsRanged = this.isAllRangedEnabled();
        }

        this.saveFilters();
    }

    public setMelee(enabled: boolean = false): void {
        this.set('melee', enabled);
    }

    public setRanged(enabled: boolean = false): void {
        this.set('ranged', enabled);
    }

    private set(itemType: 'melee' | 'ranged' | 'shields', enabled: boolean = false): void {
        this.types[itemType].forEach(type => {
            this.filters.itemTypes[type] = enabled;
        });
    }

    private applyFilterToRuneWord(runeWord: TRuneWord | IRuneWord): boolean {
        runeWord = this.runeWordHelper.asItem(runeWord);
        if (!runeWord) return false;

        if (this.filters) {
            if (this.filters.name && !StringHelper.includesStripped(runeWord.name, this.filters.name, true))
                return false;

            if (this.filters.cLvl && runeWord.cLvl > this.filters.cLvl) return false;

            const enabledFilters = ObjectHelper.entries(this.filters.itemTypes)
                .filter(([, enabled]) => enabled)
                .map(([key]) => key);

            if (enabledFilters.includes('weaponsMelee')) enabledFilters.push(...this.types.melee);
            if (enabledFilters.some(f => this.isMelee(f))) enabledFilters.push('weaponsMelee');

            if (enabledFilters.includes('weaponsRanged')) enabledFilters.push(...this.types.ranged);
            if (enabledFilters.some(f => this.isRanged(f))) enabledFilters.push('weaponsRanged');

            if (enabledFilters.length && !this.hasEnabledItemFilter(runeWord, enabledFilters)) {
                return false;
            }
        }

        this.craftableRuneSets[runeWord.name] = this.runeTracker.calculateCraftableRunes(runeWord);

        return (
            this.runeTracker.areRunesOwned(runeWord.runes) ||
            (this.filters.showCraftable && this.canCraftRunes(runeWord.name)) ||
            this.filters.showUnavailable
        );
    }

    private hasEnabledItemFilter(runeWord: IRuneWord, enabledFilters: Array<TItem>): Boolean {
        return ArrayHelper.toArray(runeWord.itemTypes).some(type => enabledFilters.includes(type));
    }
}
