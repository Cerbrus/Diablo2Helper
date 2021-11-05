import { Component } from '@angular/core';
import { RuneHelper } from '~helpers';
import { IRune } from '~interfaces/rune';
import { SpriteSocketableBaseComponent } from '~modules/ui/components/-sprite/sprite-socketable-base.component';
import { TRune } from '~types/rune';

@Component({
    selector: 'ui-sprite-rune',
    templateUrl: './ui-sprite-rune.component.html',
    styleUrls: ['./ui-sprite-rune.component.scss']
})
export class UiSpriteRuneComponent extends SpriteSocketableBaseComponent<TRune, IRune> {
    constructor(runeHelper: RuneHelper) {
        super(runeHelper);
        this.sprite = 'runes';
    }

    protected getBackground(): Record<'x' | 'y' | 'width' | 'height', number> {
        return {
            x: ((this.entity?.number ?? 1) - 1) * -32,
            y: 0,
            width: 3234 * (this.size / 98),
            height: 98 * (this.size / 98)
        };
    }
}
