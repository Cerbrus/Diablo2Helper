import { Component } from '@angular/core';
import { GemHelper } from '~helpers';
import { IGem } from '~interfaces/gem';
import { SpriteSocketableBaseComponent } from '~modules/ui/components/-sprite/sprite-socketable-base.component';
import { StorageService } from '~services';
import { GemQualities, GemTypes, TGem } from '~types/gem';

@Component({
    selector: 'ui-sprite-gem',
    templateUrl: './ui-sprite-gem.component.html',
    styleUrls: ['./ui-sprite-gem.component.scss']
})
export class UiSpriteGemComponent extends SpriteSocketableBaseComponent<TGem, IGem> {
    constructor(gemHelper: GemHelper, storageService: StorageService) {
        super(gemHelper, storageService);
        this.sprite = 'gems';
    }

    protected getBackground(): Record<'x' | 'y' | 'width' | 'height', number> {
        return {
            x: GemQualities.indexOf(this.entity?.quality) * -this.size,
            y: GemTypes.indexOf(this.entity?.type) * -this.size,
            width: 600 * (this.size / 100),
            height: 700 * (this.size / 100)
        };
    }
}
