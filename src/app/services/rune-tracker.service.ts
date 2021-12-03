import { Injectable } from '@angular/core';
import {
    ArrayHelper,
    CraftableHelper,
    GemHelper,
    NumberHelper,
    ObjectHelper,
    RuneHelper,
    RuneWordHelper
} from '~helpers';
import { IRune } from '~interfaces/rune';
import { IRuneWord } from '~interfaces/runeWord';
import { ItemOrArray } from '~types/helpers';
import { TRune } from '~types/rune';
import { StorageService } from './';

@Injectable({ providedIn: 'root' })
export class RuneTrackerService {
    public runeArray: Array<IRune>;

    public max = 999;
    public min = 0;

    constructor(
        private readonly gemHelper: GemHelper,
        private readonly runeHelper: RuneHelper,
        private readonly runeWordHelper: RuneWordHelper,
        private readonly storageService: StorageService,
        private readonly craftableHelper: CraftableHelper
    ) {
        this.runeArray = runeHelper.itemsArray;
        this.initializeRuneCounts();
    }

    public validate(rune: TRune | IRune): void {
        rune = this.runeHelper.asItem(rune);
        this.clampCount(rune);
        rune.track = (rune.owned ?? 0) > 0;
        this.saveStoredRunes();
    }

    public countRune(rune: TRune | IRune): void {
        rune = this.runeHelper.asItem(rune);
        rune.track = !rune.track;
        rune.owned = rune.track ? 1 : 0;
        this.saveStoredRunes();
    }

    public clampCount(rune: TRune | IRune): void {
        rune = this.runeHelper.asItem(rune);
        rune.owned = NumberHelper.clamp(rune.owned, this.min, this.max);
    }

    public saveStoredRunes(): void {
        this.storageService.save.runesOwned(this.craftableHelper.getRunesOwned());
    }

    public areRunesOwned(runes?: ItemOrArray<TRune | IRune>): boolean {
        if (!runes) return true;

        const runesArray = ArrayHelper.toArray(runes);
        const wishList = ArrayHelper.countStringOccurrences(this.runeHelper.asType(runesArray));

        return ObjectHelper.entries(wishList).every(
            (value: [TRune, number]) => (this.runeHelper.asItem(value[0]).owned ?? 0) >= value[1]
        );
    }

    public hasRunewordRunes(runeWord: IRuneWord): boolean {
        if (!runeWord.craft?.runes) return true;
        const runes = ArrayHelper.toArray(runeWord.craft?.runes);

        const hasMaterials = runes && this.areRunesOwned(runes);
        runeWord.craft.hasMaterials = hasMaterials;
        return hasMaterials;
    }

    private initializeRuneCounts(): void {
        const runesOwned = this.storageService.get.runesOwned();
        this.runeHelper.itemsArray.forEach(rune => {
            rune.owned = runesOwned[rune.name] ?? 0;
            rune.track = rune.owned > 0;
        });
    }
}
