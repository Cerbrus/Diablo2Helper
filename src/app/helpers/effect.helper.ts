import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EffectOptions as Options, EffectType } from '~enums';
import { IEffect, IEffectParameters as IParams } from '~interfaces/effect';
import { TEffectKey as TKey, TEffectRowConfig, TEffectValue } from '~types/effect';
import { ItemOrArray } from '~types/helpers';
import { ArrayHelper } from './ts';

// noinspection JSBitwiseOperatorUsage
@Injectable({ providedIn: 'root' })
export class EffectHelper {
    public effectRows: Array<TEffectRowConfig> = [
        { title: 'weapons', key: 'weapon' },
        { title: 'armor', key: 'armorHelm' },
        { title: 'helms', key: 'armorHelm' },
        { title: 'shields', key: 'shield' }
    ];

    constructor(private readonly translate: TranslateService) {}

    public static effect(key: TKey, value?: TEffectValue, options?: Options, parameters?: IParams): IEffect;
    public static effect(key: TKey, value?: TEffectValue, parameters?: IParams): IEffect;
    public static effect(key: TKey, value?: TEffectValue, options?: IParams | Options, parameters?: IParams): IEffect {
        if (options && typeof options === 'object') {
            parameters = options;
            options = undefined;
        }

        const type = key.split('.')[0];

        const effectType = {
            stat: EffectType.Stat,
            resist: EffectType.Resistance,
            absorb: EffectType.Defense,
            damage: EffectType.Damage,
            Skill: EffectType.Skill,
            effect: EffectType.Effect,
            on: EffectType.OnHitOnKill,
            chance: EffectType.CastChance
        }[type];

        return {
            description: `effect.${key}`,
            type: effectType ?? EffectType.Other,
            value,
            options,
            parameters
        };
    }

    public formatEffects(effects: ItemOrArray<IEffect | string>, lineBreak = false): string | null {
        effects = ArrayHelper.toArray(effects);

        if (!Object.keys(this.translate.translations).length) return null;

        const charLvl = this.translate.instant('effect.suffix.charLvl');
        const varies = this.translate.instant('effect.suffix.varies');

        return effects
            .map(effect => {
                if (typeof effect === 'string') {
                    const translated = this.translate.instant(`effect.${effect}`);
                    return effect.startsWith('appliesTo') ? `<strong>${translated}</strong>` : translated;
                }

                const { parameters: parameters } = effect;
                if (parameters?.class)
                    parameters.class = this.translate.instant(`character.classes.${parameters?.class}`);

                const translated = [this.translate.instant(effect.description, { ...effect, ...parameters })];

                if (effect.options) {
                    if (effect.options & Options.Varies) translated.push(varies);
                    if (effect.options & Options.CharLvl) translated.push(charLvl);
                }

                return translated.join(' ');
            })
            .join(lineBreak ? '\r\n' : ', ');
    }
}
