import { Component } from '@angular/core';
import { ArrayHelper, CraftableHelper, GemHelper } from '~helpers';
import { IGem, IGemMap, IGemType } from '~interfaces/gem';

@Component({
    selector: 'list-gems',
    templateUrl: './list-gems.component.html',
    styleUrls: ['./list-gems.component.scss']
})
export class ListGemsComponent {
    public gems: IGemMap;
    public gemArray: Array<IGemType>;

    constructor(private readonly gemHelper: GemHelper, private readonly craftableHelper: CraftableHelper) {
        this.gems = gemHelper.items;
        this.gemArray = gemHelper.buildGemArray();
    }

    public gemOwned(gem: IGem, amount: number | null = null): void {
        if (amount != null) gem.owned = amount;

        const nextGem = GemHelper.getHigherQuality(gem.quality, gem.type);
        if (nextGem) {
            const nextGemEntity = this.gemHelper.getItem(nextGem);
            this.craftableHelper.calculateCraftabilityFor(nextGemEntity);
            this.gemOwned(nextGemEntity);
        }
        this.gemHelper.saveEntitiesOwned();
    }

    public craft(gem: IGem): void {
        const material = ArrayHelper.toArray(gem.craft?.gems)[0];
        if (!material) return;

        const item = this.gemHelper.asItem(material);
        if ((item?.owned ?? 0) < 3) return;

        gem.owned = (gem.owned ?? 0) + 1;
        item.owned = (item.owned ?? 0) - 3;

        this.craftableHelper.calculateCraftabilityFor(gem);
        const nextGem = GemHelper.getHigherQuality(gem.quality, gem.type);
        if (nextGem) this.craftableHelper.calculateCraftabilityFor(this.gemHelper.getItem(nextGem));
        this.gemHelper.saveEntitiesOwned();
    }
}
