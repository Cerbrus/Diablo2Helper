import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RuneHelper } from '../../helpers';
import { IRune } from '../../interfaces/rune';
import { TRune } from '../../types/rune';
import { SpriteBaseComponent } from '../sprite-base.component';

@Component({
    selector: 'sprite-rune',
    templateUrl: './sprite-rune.component.html',
    styleUrls: ['./sprite-rune.component.scss']
})
export class SpriteRuneComponent extends SpriteBaseComponent {
    public runeItem!: IRune;

    @Input()
    public set rune(rune: IRune | TRune) {
        this.runeItem = this.runeHelper.asItem(rune);
        this.sprite = this.getRuneSprite();
    }

    constructor(
        private readonly runeHelper: RuneHelper,
        translate: TranslateService) {
        super(translate);
    }

    public getRuneSprite(): string {
        return this.runeItem && `/assets/images/runes/${this.runeItem.name.toLowerCase()}_rune.sprite.00.png`;
    }
}
