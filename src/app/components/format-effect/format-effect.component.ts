import { Component, Input } from '@angular/core';
import { EffectHelper } from '../../helpers';
import { IEffect } from '../../interfaces/effect';
import { ItemOrArray } from '../../types/helpers';

@Component({
    selector: 'format-effect',
    templateUrl: './format-effect.component.html',
    styleUrls: ['./format-effect.component.scss']
})
export class FormatEffectComponent {
    get formattedEffects(): string {
        return this.effectHelper.formatEffects(this.effects, this.lineBreak);
    }

    @Input()
    public title?: string;

    @Input()
    public effects!: ItemOrArray<IEffect>;

    @Input()
    public lineBreak = false;

    constructor(private readonly effectHelper: EffectHelper) {
    }
}
