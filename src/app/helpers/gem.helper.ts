import { Injectable } from '@angular/core';
import { isArray } from 'rxjs/internal-compatibility';
import { GemFactory } from '../factories/gem.factory';
import { ITable } from '../interfaces';
import { IGem, IGemMap, IGemType } from '../interfaces/gem';
import { IRune } from '../interfaces/rune';
import { GemQualities, GemTypes, TGem, TGemSort, TGemType } from '../types/gem';
import { TRune } from '../types/rune';
import { BaseEntitiesHelper } from './base-entities.helper';

@Injectable({ providedIn: 'root' })
export class GemHelper extends BaseEntitiesHelper<IGemMap, TGem, IGem, TGemSort> {
    constructor(gemFactory: GemFactory) {
        super(gemFactory);
    }

    public getItem([type, quality]: TGem): IGem {
        return this.getItems()[type][quality];
    }

    public isItem(socketable: IGem | IRune): socketable is IGem {
        return 'quality' in socketable;
    }

    public isType(item: object | TGem | TRune): item is TGem {
        return isArray(item) &&
            item.length === 2 &&
            GemTypes.includes(item[0]) &&
            GemQualities.includes(item[1]);
    }

    public getType(item: TGem | IGem): TGem {
        const { type, quality } = this.asItem(item);
        return [type, quality];
    }

    public buildGemArray(): Array<IGemType> {
        return GemTypes.map((type: TGemType) => ({
            type: type,
            gems: GemQualities.map(quality => this.items[type][quality])
        }));
    }

    protected applySort(changedSort?: ITable<IGem>): void {
        // this.applyChangedSort(
        //     {
        //         type: this.sortByType.bind(this),
        //         quality: this.sortByQuality.bind(this)
        //     },
        //     'type' as TGemSortKeys,
        //     changedSort);
        //
        //this.storageService.save.runeWordSort(this.entitySort);
    }
}
