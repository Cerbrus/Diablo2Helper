import { Component, Input } from '@angular/core';
import { Classes, TClass } from '../../../types';
import { TSpriteAnimation } from '../../../types/animation';

@Component({
    selector: 'ui-sprite-class',
    templateUrl: './ui-sprite-class.component.html',
    styleUrls: ['./ui-sprite-class.component.scss']
})
export class UiSpriteClassComponent {
    public sprite?: TSpriteAnimation;

    @Input()
    public set class(characterClass: TClass | null | undefined) {
        if (characterClass && Classes.includes(characterClass)) {
            this.sprite = this.classSprites[characterClass];
        }
    }

    @Input()
    public scale = 1;

    private classSprites: Record<TClass, TSpriteAnimation> = {
        amazon: { frames: 18, sprite: 'amazon' },
        assassin: { frames: 31, sprite: 'assassin' },
        barbarian: { frames: 26, sprite: 'barbarian' },
        druid: { frames: 21, sprite: 'druid' },
        necromancer: { frames: 12, sprite: 'necromancer' },
        paladin: { frames: 9, sprite: 'paladin' },
        sorceress: { frames: 12, sprite: 'sorceress' }
    };
}
