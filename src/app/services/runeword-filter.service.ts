import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import {
    ArrayHelper,
    BaseEntitiesHelper,
    CraftableHelper,
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

    private readonly typeCollections: Record<'weaponsMelee' | 'weaponsRanged' | 'armor', Array<TItem>> = {
        weaponsMelee: ['axe', 'claw', 'club', 'hammer', 'mace', 'poleArm', 'scepter', 'stave', 'sword', 'wand'],
        weaponsRanged: ['bow', 'crossbow'],
        armor: ['armorBody', 'armorHead', 'shield', 'paladinShield']
    };

    private readonly filterPredicates: Array<(runeWord: IRuneWord) => boolean> = [
        rw => this.filters.showFavorite && !rw.favorite,
        rw => !!this.filters.cLvl && rw.cLvl > this.filters.cLvl,
        rw => !!this.filters.name && !StringHelper.includesStripped(rw.name, this.filters.name, true),
        rw => !!this.filters.numberOfRunes && rw.craft?.runes?.length !== this.filters.numberOfRunes
    ];

    private runeWords: IRuneWordMap;
    private runeWordVisibility: Record<TRuneWord, boolean> = ArrayHelper.toRecord([...RuneWords], () => false);

    constructor(
        private readonly storageService: StorageService,
        private readonly gemHelper: GemHelper,
        private readonly runeHelper: RuneHelper,
        private readonly runeWordHelper: RuneWordHelper,
        private readonly craftableHelper: CraftableHelper,
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

    public isInCollection(itemType: TItem, collection: Array<TItem>): boolean {
        return collection.includes(itemType);
    }

    public isAllEnabled(collection: Array<TItem>): boolean {
        return collection.every(type => this.filters.itemTypes[type]);
    }

    public updateFilters(itemType: TItem): void {
        const filters = this.filters.itemTypes;

        ObjectHelper.forEach(this.typeCollections, (type: TItem, collection: Array<TItem>) => {
            if (itemType === type) {
                collection.forEach(t => (filters[t] = filters[type]));
            } else if (this.isInCollection(itemType, collection)) {
                filters[type] = this.isAllEnabled(collection);
            }
        });

        this.saveFilters();
    }

    public saveFilters(): void {
        this.calculateRuneWordVisibility();
        this.storageService.save.runeWordFilters(this.filters);
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

    private getItemTypeFilters(): Array<TItem> {
        const itemTypes = ObjectHelper.entries(this.filters.itemTypes)
            .filter(([, enabled]) => enabled)
            .map(([key]) => key);

        ObjectHelper.forEach(this.typeCollections, (type: TItem, collection: Array<TItem>) => {
            if (itemTypes.includes(type)) itemTypes.push(...collection);
            if (itemTypes.some(f => this.isInCollection(f, collection))) itemTypes.push(type);
        });

        return [...new Set(itemTypes)];
    }

    private applyFilterToRuneWord(runeWord: TRuneWord | IRuneWord, itemTypes: Array<TItem>): boolean {
        runeWord = this.runeWordHelper.asItem(runeWord);
        if (!runeWord) return false;

        if (this.filters) {
            if (this.filterPredicates.some(shouldHide => shouldHide(<IRuneWord>runeWord))) return false;
            if (itemTypes?.length && !this.hasEnabledItemFilter(runeWord, itemTypes)) return false;
        }

        this.craftableHelper.canCraftMaterialsFor(runeWord);
        // this.runeTracker.canCraftRuneWordRunes(runeWord);
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
