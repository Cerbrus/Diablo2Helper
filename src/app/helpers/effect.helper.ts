import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isArray } from 'rxjs/internal-compatibility';
import { EffectType } from '../enums/EffectType';
import { IEffect } from '../interfaces/effect';
import { ISocketableEffects } from '../interfaces/socketable';
import { TEffect } from '../types';
import { ItemOrArray } from '../types/helpers';

export type EffectRowConfig = { title: string, key: keyof ISocketableEffects }

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

    public static integerEffect(description: TEffect, Effect?: number | undefined, duration?: number): IEffect {
        return EffectHelper.buildEffect(description, Effect, '', duration);
    }

    public static percentageEffect(description: TEffect, Effect?: number | undefined, duration?: number): IEffect {
        return EffectHelper.buildEffect(description, Effect, '%', duration);
    }

    public static damageOverTimeEffect(description: TEffect, Effect: number | undefined, duration: number): IEffect {
        return EffectHelper.buildEffect(description, Effect, '', duration);
    }

    public static rangeEffect(description: TEffect, min: number, max: number, duration?: number): IEffect {
        return {
            ...EffectHelper.buildEffect(description, min, ''),
            value: { min, max, sign: '+', duration }
        };
    }

    public formatEffects(effects: ItemOrArray<IEffect | string>, lineBreak = false): string {
        if (!isArray(effects))
            effects = [effects];

        return effects.map(effect => {
                return typeof effect === 'string'
                    ? effect.replace(/[\r\n]+/g, lineBreak ? '\r\n' : ', ')
                    : this.translate.instant(`effects.${effect.description}`, effect.value);
            })
            .join(lineBreak ? '\r\n' : ', ');
    }

    private static buildEffect(
        description: TEffect,
        value?: number | undefined,
        unit?: '%' | '',
        duration?: number): IEffect {
        const result: IEffect = {
            description,
            type: this.getEffectType(description)
        };

        if (value !== undefined)
            result.value = {
                value,
                sign: value > 0 ? '+' : '',
                unit,
                duration
            };

        return result;
    }

    private static getEffectType(effect: TEffect): EffectType {
        return this.effectMap[effect] ?? EffectType.Other;
    }

    private static effectMap: Partial<{
        [key in TEffect]?: EffectType
    }> = {
        AR: EffectType.Stat,
        ARDemons: EffectType.Stat,
        ARUndead: EffectType.Stat,
        AttackRating: EffectType.Stat,

        Blocking: EffectType.Defense,
        CannotBeFrozen: EffectType.Defense,

        ChanceBlind: EffectType.Other,
        ChanceCrushingBlow: EffectType.Other,
        ChanceDeadlyStrike: EffectType.Other,
        ChanceFear: EffectType.Other,
        ChanceFreeze: EffectType.Other,
        ChanceOpenWounds: EffectType.Other,

        Damage: EffectType.Damage,
        DamageCold: EffectType.Damage,
        DamageDemons: EffectType.Damage,
        DamageFire: EffectType.Damage,
        DamageLightning: EffectType.Damage,
        DamageMaximum: EffectType.Damage,
        DamageMinimum: EffectType.Damage,
        DamagePoison: EffectType.Damage,
        DamageTaken: EffectType.Damage,
        DamageToMana: EffectType.Damage,
        DamageUndead: EffectType.Damage,

        DefenseTarget: EffectType.Defense,

        ExtraGold: EffectType.Other,
        Indestructible: EffectType.Other,
        KnockBack: EffectType.Other,
        LeechLife: EffectType.Other,
        LeechMana: EffectType.Other,
        LowerStaminaDrain: EffectType.Other,
        MagicFind: EffectType.Other,

        MaxLife: EffectType.Stat,

        OnKillMana: EffectType.Other,

        Piercing: EffectType.Damage,

        PreventMonsterHealing: EffectType.Other,
        RateAttack: EffectType.Stat,
        RateBlock: EffectType.Stat,
        RateHitRecovery: EffectType.Stat,

        ReduceDamage: EffectType.Defense,
        ReduceDamageMagic: EffectType.Defense,

        StatRegenMana: EffectType.Other,
        Requirements: EffectType.Other,

        ResistAll: EffectType.Resistance,
        ResistCold: EffectType.Resistance,
        ResistFire: EffectType.Resistance,
        ResistLightning: EffectType.Resistance,
        ResistMaxCold: EffectType.Resistance,
        ResistMaxFire: EffectType.Resistance,
        ResistMaxLightning: EffectType.Resistance,
        ResistMaxPoison: EffectType.Resistance,
        ResistPoison: EffectType.Resistance,

        StatDefense: EffectType.Stat,
        StatDefenseMissile: EffectType.Stat,
        StatDexterity: EffectType.Stat,
        StatEnergy: EffectType.Stat,
        StatHPOfTotal: EffectType.Stat,
        StatHitPoints: EffectType.Stat,
        StatLife: EffectType.Stat,
        StatLightRadius: EffectType.Stat,
        StatMana: EffectType.Stat,
        StatManaTotal: EffectType.Stat,
        StatRegenLife: EffectType.Stat,
        StatStrength: EffectType.Stat,
        StatVitality: EffectType.Stat,

        Thorns: EffectType.Defense
    };
}
