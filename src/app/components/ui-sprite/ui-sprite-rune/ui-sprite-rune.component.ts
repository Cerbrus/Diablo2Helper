import { Component, Input } from '@angular/core';
import { RuneHelper } from '../../../helpers';
import { IRune } from '../../../interfaces/rune';
import { TRune } from '../../../types/rune';
import { SpriteBaseComponent } from '../sprite-base.component';

@Component({
    selector: 'ui-sprite-rune',
    templateUrl: './ui-sprite-rune.component.html'
})
export class UiSpriteRuneComponent extends SpriteBaseComponent {
    public runeItem!: IRune;

    @Input()
    public set rune(rune: IRune | TRune) {
        this.runeItem = this.runeHelper.asItem(rune);
    }

    constructor(private readonly runeHelper: RuneHelper) {
        super();
        this.sprite = 'runes';
    }

    protected getBackground(): Record<'x' | 'y' | 'width' | 'height', number> {
        return {
            x: ((this.runeItem?.number ?? 1) - 1) * -32,
            y: 0,
            width: 3234 * (this.size / 98),
            height: 98 * (this.size / 98)
        };
    }
}
