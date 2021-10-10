import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GemHelper } from '../../helpers';
import { IGem } from '../../interfaces/gem';
import { GemQualities, GemTypes, TGem } from '../../types/gem';
import { SpriteBaseComponent } from '../sprite-base.component';

@Component({
    selector: 'ui-sprite-gem',
    templateUrl: './ui-sprite-gem.component.html',
    styleUrls: ['./ui-sprite-gem.component.scss']
})
export class UiSpriteGemComponent extends SpriteBaseComponent {
    public gemItem!: IGem;

    @Input()
    public set gem(gem: TGem | IGem) {
        this.gemItem = this.gemHelper.asItem(gem);
    }

    constructor(
        translate: TranslateService,
        private readonly gemHelper: GemHelper) {
        super(translate);
    }

    protected getBackgroundX = () => GemQualities.indexOf(this.gemItem.quality) * -this.size;
    protected getBackgroundY = () => GemTypes.indexOf(this.gemItem.type) * -this.size;

    public getBackgroundSize(): string {
        return `${600 * (this.size / 100)}px ${700 * (this.size / 100)}px`;
    }
}
