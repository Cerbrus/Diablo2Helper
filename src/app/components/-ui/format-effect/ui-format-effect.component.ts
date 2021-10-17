import { Component, HostBinding, Input } from '@angular/core';
import { EffectHelper } from '../../../helpers';
import { IEffect } from '../../../interfaces/effect';
import { ItemOrArray } from '../../../types/helpers';

@Component({
    selector: 'ui-format-effect',
    templateUrl: './ui-format-effect.component.html',
    styleUrls: ['./ui-format-effect.component.scss']
})
export class UiFormatEffectComponent {
    private formatted?: string | null;

    get formattedEffects(): string | null {
        if (!this.formatted)
            this.formatted = this.effectHelper.formatEffects(this.effects, this.lineBreak);

        return this.formatted;
    }

    @Input()
    public title?: string;

    @Input()
    public effects!: ItemOrArray<IEffect | string>;

    @Input()
    public lineBreak = false;

    @HostBinding('hidden')
    get isHidden(): boolean {
        return !this.effects;
    }

    constructor(private readonly effectHelper: EffectHelper) {
    }
}
