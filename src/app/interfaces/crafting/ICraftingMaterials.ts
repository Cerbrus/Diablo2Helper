import { IGem } from '~interfaces/gem';
import { TGem } from '~types/gem';
import { ItemOrArray } from '~types/helpers';
import { TRune } from '~types/rune';

export interface ICraftingMaterials {
    runes?: ItemOrArray<TRune>;
    gems?: ItemOrArray<TGem | IGem>;
    hasMaterials?: boolean;
    canCraftMaterials?: boolean;
}
