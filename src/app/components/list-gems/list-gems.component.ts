import { Component } from '@angular/core';
import { GemHelper } from '../../helpers';
import { IGem, IGemMap, IGemType } from '../../interfaces/gem';

@Component({
    selector: 'list-gems',
    templateUrl: './list-gems.component.html',
    styleUrls: ['./list-gems.component.scss']
})
export class ListGemsComponent {
    public gems: IGemMap;
    public gemArray: Array<IGemType>;

    constructor(
        private readonly gemHelper: GemHelper
    ) {
        this.gems = gemHelper.getItems();
        this.gemArray = gemHelper.buildGemArray();
    }

    public gemOwned(gem: IGem, amount?: number): void {
        if (amount) gem.owned = amount;
        this.gemHelper.saveGemsOwned();
    }
}
