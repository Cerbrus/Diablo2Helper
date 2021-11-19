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
    private runeWordVisibility: Record<TRuneWord, boolean> = ArrayHelper.toRecord([...RuneWords], () => false);

    private readonly filterPredicates: Array<(runeWord: IRuneWord) => boolean> = [
        rw => this.filters.showFavorite && !rw.favorite,
        rw => !!this.filters.cLvl && rw.cLvl > this.filters.cLvl,
        rw => !!this.filters.name && !StringHelper.includesStripped(rw.name, this.filters.name, true),
        rw => !!this.filters.numberOfRunes && rw.craft?.runes?.length !== this.filters.numberOfRunes
    ];

    constructor(
        private readonly storageService: StorageService,
        private readonly gemHelper: GemHelper,
        private readonly runeHelper: RuneHelper,
        private readonly runeWordHelper: RuneWordHelper,
        private readonly runeTracker: RuneTrackerService
    ) {
        this.filters = storageService.get.runeWordFilters();
        this.runeWords = runeWordHelper.items;
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

    public calculateRuneWordVisibility(): void {
        const itemTypes = this.getItemTypeFilters();
        this.runeWordVisibility = ArrayHelper.toRecord([...RuneWords], (runeWord: TRuneWord) =>
            this.applyFilterToRuneWord(runeWord, itemTypes)
        );
    }

    public canShowRuneWord(runeWord: IRuneWord | TRuneWord): boolean {
        return this.runeWordVisibility[this.runeWordHelper.asType(runeWord)];
    }

    public clampClvl(min: number, max: number): void {
        if (this.filters.cLvl) this.filters.cLvl = NumberHelper.clamp(this.filters.cLvl, min, max);

        this.saveFilters();
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

    private set(itemType: 'melee' | 'ranged' | 'shields', enabled: boolean = false): void {
        this.types[itemType].forEach(type => {
            this.filters.itemTypes[type] = enabled;
        });
    }

    private getItemTypeFilters(): Array<TItem> {
        const itemTypes = ObjectHelper.entries(this.filters.itemTypes)
            .filter(([, enabled]) => enabled)
            .map(([key]) => key);

        if (itemTypes.includes('weaponsMelee')) itemTypes.push(...this.types.melee);
        if (itemTypes.some(f => this.isMelee(f))) itemTypes.push('weaponsMelee');

        if (itemTypes.includes('weaponsRanged')) itemTypes.push(...this.types.ranged);
        if (itemTypes.some(f => this.isRanged(f))) itemTypes.push('weaponsRanged');

        return itemTypes;
    }

    private applyFilterToRuneWord(runeWord: TRuneWord | IRuneWord, itemTypes: Array<TItem>): boolean {
        runeWord = this.runeWordHelper.asItem(runeWord);
        if (!runeWord) return false;

        if (this.filters) {
            if (this.filterPredicates.some(shouldHide => shouldHide(<IRuneWord>runeWord))) return false;
            if (itemTypes?.length && !this.hasEnabledItemFilter(runeWord, itemTypes)) return false;
        }

        this.runeTracker.canCraftRuneWordRunes(runeWord);
        this.runeTracker.hasRunewordRunes(runeWord);

        return (
            runeWord.craft?.hasMaterials ||
            (this.filters.showCraftable && runeWord.craft?.canCraftMaterials) ||
            this.filters.showUnavailable
        );
    }

    private hasEnabledItemFilter(runeWord: IRuneWord, enabledFilters: Array<TItem>): Boolean {
        return ArrayHelper.toArray(runeWord.itemTypes).some(type => enabledFilters.includes(type));
    }
}
