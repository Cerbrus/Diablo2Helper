import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GemHelper } from '../../helpers';
import { IGem } from '../../interfaces/gem';
import { TGem } from '../../types/gem';
import { SpriteBaseComponent } from '../sprite-base.component';

@Component({
    selector: 'sprite-gem',
    templateUrl: './sprite-gem.component.html',
    styleUrls: ['./sprite-gem.component.scss']
})
export class SpriteGemComponent extends SpriteBaseComponent {
    public gemItem!: IGem;

    @Input()
    public set gem(gem: TGem | IGem) {
        this.gemItem = this.gemHelper.asItem(gem);
        this.sprite = this.getGemSprite();
    }

    constructor(
        translate: TranslateService,
        private readonly gemHelper: GemHelper) {
        super(translate);
    }

    private getGemSprite(): string {
        const { type, quality } = this.gemItem;
        const qualityPrefix = quality !== 'normal' ? `${quality}_` : '';
        return `/assets/images/gems/${qualityPrefix + type}.png`;
    }
}
