import { Injectable } from '@angular/core';
import { IItem } from '@dschu012/d2s/lib/d2/types';
import { GemFactory } from '~factories/gem.factory';
import { IGem, IGemMap, IGemType } from '~interfaces/gem';
import { IRune } from '~interfaces/rune';
import { ITable } from '~interfaces/ui';
import { StorageService } from '~services';
import { GemQualities, GemTypes, TGem, TGemQuality, TGemSort, TGemType } from '~types/gem';
import { TRune } from '~types/rune';
import { BaseEntitiesHelper } from './base-entities.helper';
import { ArrayHelper } from './ts';

@Injectable({ providedIn: 'root' })
export class GemHelper extends BaseEntitiesHelper<IGemMap, TGem, IGem, TGemSort> {
    constructor(gemFactory: GemFactory, private readonly storageService: StorageService) {
        super(gemFactory);
    }

    public fromSaveItem(item: IItem): IGem | null {
        const name = item.type_name.toLowerCase();
        return this.getItem(<TGem>(name.includes(' ') ? name.replace(' ', '|') : `normal|${name}`));
    }

    public splitType(gem: TGem): [TGemQuality, TGemType] {
        const split = gem.split('|');
        if (split.length !== 2) throw new Error(`Invalid type! ${gem}`);
        // @ts-ignore We checked the length.
        return split;
    }

    public getItem(gem: TGem): IGem {
        const [quality, type] = this.splitType(gem);
        return this.items[type][quality];
    }

    public isItem(socketable: TGem | TRune | IGem | IRune): socketable is IGem {
        return typeof socketable !== 'string' && 'quality' in socketable;
    }

    public isType(item: object | TGem | TRune): item is TGem {
        if (typeof item !== 'string' || !item.includes('|')) return false;

        const split = this.splitType(<TGem>item);
        return GemQualities.includes(split[0]) && GemTypes.includes(split[1]);
    }

    public getType(item: TGem | IGem): TGem {
        return GemHelper.getType(item);
    }

    public static getType(gem: TGem | IGem): TGem {
        return typeof gem === 'string' ? gem : `${gem.quality}|${gem.type}`;
    }

    public saveEntitiesOwned(): void {
        const owned = ArrayHelper.toRecordWithKey<TGem, number, IGem>(
            this.itemsArray.filter(gem => gem.owned),
            gem => `${gem.quality}|${gem.type}`,
            gem => gem.owned!
        );

        this.storageService.save.gemsOwned(owned);
    }

    public buildGemArray(): Array<IGemType> {
        return GemTypes.map((type: TGemType) => ({
            type: type,
            gems: GemQualities.map(quality => this.items[type][quality])
        }));
    }

    public static getLowerQuality(quality: TGemQuality, type: TGemType): TGem | null {
        return quality === 'chipped' ? null : this.getNextQuality(quality, type, -1);
    }

    public static getHigherQuality(quality: TGemQuality, type: TGemType): TGem | null {
        return quality === 'perfect' ? null : this.getNextQuality(quality, type, 1);
    }

    public static getNextQuality(quality: TGemQuality, type: TGemType, offset: 1 | -1): TGem | null {
        return `${GemQualities[GemQualities.indexOf(quality) + offset]}|${type}`;
    }

    // noinspection JSUnusedLocalSymbols
    protected applySort(changedSort?: ITable<IGem>): void {
        // this.applyChangedSort(
        //     {
        //         type: this.sortByType.bind(this),
        //         quality: this.sortByQuality.bind(this),
        //         owned: this.sortByOwned.bind(this)
        //     },
        //     <TGemSortKeys>'type',
        //     changedSort);
        //
        //this.storageService.save.runeWordSort(this.entitySort);
    }
}
