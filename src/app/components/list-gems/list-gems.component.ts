import { Component } from '@angular/core';
import { GemHelper } from '../../helpers';
import { IGemMap, IGemType } from '../../interfaces/gem';

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
}
