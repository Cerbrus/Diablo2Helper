import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EffectOptions, EffectType } from '../enums';
import { IEffect, IEffectParameters } from '../interfaces/effect';
import { ISocketableEffects } from '../interfaces/socketable';
import { TEffectKey } from '../types';
import { ItemOrArray } from '../types/helpers';
import { ArrayHelper } from './ts';

export type EffectRowConfig = { title: string, key: keyof ISocketableEffects }

// noinspection JSBitwiseOperatorUsage
@Injectable({ providedIn: 'root' })
export class EffectHelper {
    public effectRows: Array<EffectRowConfig> = [
        { title: 'weapons', key: 'weapon' },
        { title: 'armor', key: 'armorHelm' },
        { title: 'helms', key: 'armorHelm' },
        { title: 'shields', key: 'shield' }
    ];

    constructor(private readonly translate: TranslateService) {
    }

    public static effect(
        key: TEffectKey, value?: string | number, options?: EffectOptions, parameters?: IEffectParameters
    ): IEffect;
    public static effect(
        key: TEffectKey, value?: string | number, parameters?: IEffectParameters
    ): IEffect;
    public static effect(
        key: TEffectKey, value?: string | number, options?: IEffectParameters | EffectOptions, parameters?: IEffectParameters
    ): IEffect {
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
    };

    public formatEffects(effects: ItemOrArray<IEffect | string>, lineBreak = false): string | null {
        effects = ArrayHelper.toArray(effects);

        if (!Object.keys(this.translate.translations).length)
            return null;

        const charLvl = this.translate.instant('effect.suffix.charLvl');
        const varies = this.translate.instant('effect.suffix.varies');

        return effects.map(effect => {
                if (typeof effect === 'string'){
                    const translated =this.translate.instant(`effect.${effect}`);
                    return effect.startsWith('appliesTo')
                        ? `<strong>${translated}</strong>`
                        : translated;
                }

                const { parameters: parameters } = effect;
                if (parameters?.class) parameters.class = this.translate.instant(`character.classes.${parameters?.class}`);

                const translated = [
                    this.translate.instant(effect.description, { ...effect, ...parameters })
                ];

                if (effect.options) {
                    if (effect.options & EffectOptions.Varies)
                        translated.push(varies);
                    if (effect.options & EffectOptions.CharLvl)
                        translated.push(charLvl);
                }

                return translated.join(' ');
            })
            .join(lineBreak ? '\r\n' : ', ');
    }
}
