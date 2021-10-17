import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isArray } from 'rxjs/internal-compatibility';
import { EffectType } from '../enums/EffectType';
import { IEffect, IEffectValueMinMax, IEffectValueNumber, IEffectValueSkill } from '../interfaces/effect';
import { ISocketableEffects } from '../interfaces/socketable';
import { TEffect } from '../types';
import { ItemOrArray } from '../types/helpers';
import { TClass, TSkill, TSkillGroup } from '../types/player';

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

    public static integerEffect = (description: TEffect, Effect?: number | undefined, duration?: number) =>
        EffectHelper.buildEffect(description, Effect, '', duration);

    public static percentageEffect = (description: TEffect, Effect?: number | undefined, duration?: number) =>
        EffectHelper.buildEffect(description, Effect, '%', duration);

    public static damageOverTimeEffect = (description: TEffect, Effect: number | undefined, duration: number) =>
        EffectHelper.buildEffect(description, Effect, '', duration);

    public static rangeEffect = (description: TEffect, min: number, max: number, duration?: number): IEffect => ({
        ...EffectHelper.buildEffect(description, min, ''),
        value: { min, max, sign: '+', duration }
    });

    public static skillEffect = (count: number, skill: TSkill) =>
        EffectHelper.skill('Skill', count, skill);

    public static skillRangeEffect = (min: number, max: number, skill: TSkill) =>
        EffectHelper.skill('SkillRange', min, skill, max);

    public static skillGroupEffect = (count: number, skill: TSkillGroup, classRestriction?: TClass) =>
        EffectHelper.skill(classRestriction ? 'SkillGroupClass' : 'SkillGroup', count, skill, undefined, classRestriction);

    public static skillClassEffect = (count: number, skill: TSkill, classRestriction: TClass) =>
        EffectHelper.skill('SkillClass', count, skill, undefined, classRestriction);

    public static skillChargesEffect = (level: number, skill: TSkill, charges: number) =>
        EffectHelper.skill('SkillCharges', level, skill, charges);

    public static skillAllEffect = (level: number, classRestriction: TClass | 'all' = 'all') =>
        EffectHelper.skill(classRestriction === 'all' ? 'SkillAll' : 'SkillAllClass', level, 'All', undefined, classRestriction);

    public static skillAuraEffect = (level: number, skill: TSkill) =>
        EffectHelper.skill('SkillAura', level, skill);

    public static skillAuraRangeEffect = (min: number, max: number, skill: TSkill) =>
        EffectHelper.skill('SkillAuraRange', min, skill, max);

    private static skill(
        description: TEffect,
        count: number,
        skill: TSkill | TSkillGroup | 'All',
        charges?: number,
        classRestriction?: TClass | 'all'
    ): IEffect {
        return {
            description,
            value: { sign: '+', count, skill, charges, classRestriction },
            type: EffectType.Skill
        };
    }

    public formatEffects(effects: ItemOrArray<IEffect | string>, lineBreak = false): string | null {
        if (!isArray(effects))
            effects = [effects];

        if (!Object.keys(this.translate.translations).length)
            return null;

        return effects.map(effect => {
                if (typeof effect === 'string') {
                    return effect.replace(/[\r\n]+/g, lineBreak ? '\r\n' : ', ');
                }

                const { value } = effect;
                if (EffectHelper.isSkillEffect(value) && value.classRestriction) {
                    value.class = this.translate.instant(`character.classes.${value.classRestriction}`);
                }
                return this.translate.instant(`effects.${effect.description}`, value);
            })
            .join(lineBreak ? '\r\n' : ', ');
    }

    private static isSkillEffect(value?: number | IEffectValueNumber | IEffectValueMinMax | IEffectValueSkill): value is IEffectValueSkill {
        return !!value &&
            typeof value !== 'number' &&
            'skill' in value;
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
