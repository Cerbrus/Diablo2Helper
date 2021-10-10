import { Component, Input } from '@angular/core';
import { RuneHelper } from '../../helpers';
import { IRune } from '../../interfaces/rune';
import { TRune } from '../../types/rune';
import { SpriteBaseComponent } from '../sprite-base.component';

@Component({
    selector: 'ui-sprite-rune',
    templateUrl: './ui-sprite-rune.component.html',
    styleUrls: ['./ui-sprite-rune.component.scss']
})
export class UiSpriteRuneComponent extends SpriteBaseComponent {
    public runeItem!: IRune;

    @Input()
    public set rune(rune: IRune | TRune) {
        this.runeItem = this.runeHelper.asItem(rune);
    }

    constructor(private readonly runeHelper: RuneHelper) {
        super();
    }

    protected getBackgroundX = () => (this.runeItem.number - 1) * -32;
    protected getBackgroundY = () => 0;
}
