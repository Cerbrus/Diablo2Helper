import { Component, Input } from '@angular/core';
import { GemHelper } from '../../../../../helpers';
import { IGem } from '../../../../../interfaces/gem';
import { GemQualities, GemTypes, TGem } from '../../../../../types/gem';
import { SpriteBaseComponent } from '../sprite-base.component';

@Component({
    selector: 'ui-sprite-gem',
    templateUrl: './ui-sprite-gem.component.html'
})
export class UiSpriteGemComponent extends SpriteBaseComponent {
    public gemItem!: IGem;

    @Input()
    public set gem(gem: TGem | IGem) {
        this.gemItem = this.gemHelper.asItem(gem);
    }

    constructor(private readonly gemHelper: GemHelper) {
        super();
        this.sprite = 'gems';
    }

    protected getBackground(): Record<'x' | 'y' | 'width' | 'height', number> {
        return {
            x: GemQualities.indexOf(this.gemItem?.quality) * -this.size,
            y: GemTypes.indexOf(this.gemItem?.type) * -this.size,
            width: 600 * (this.size / 100),
            height: 700 * (this.size / 100)
        };
    }
}
