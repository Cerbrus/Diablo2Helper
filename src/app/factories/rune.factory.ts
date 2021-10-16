import { Injectable } from '@angular/core';
import { ArrayHelper, EffectHelper, GemHelper } from '../helpers';
import { IRuneMap } from '../interfaces/rune';
import { BaseEntityFactory } from './base-entity.factory';

@Injectable({ providedIn: 'root' })
export class RuneFactory extends BaseEntityFactory<IRuneMap> {
    constructor(private readonly gemHelper: GemHelper) {
        super();
    }

    public buildItems(): IRuneMap {
        const gems = this.gemHelper.getItems();

        const { repeat } = ArrayHelper;
        const {
            integerEffect: int,
            percentageEffect: pct,
            rangeEffect: rng,
            damageOverTimeEffect: dot
        } = EffectHelper;

        return {
            El: {
                name: 'El', number: 1, cLvl: 11,
                effects: {
                    weapon: [
                        int('AttackRating', 50),
                        int('StatLightRadius', 1)
                    ],
                    armorHelm: [
                        int('StatLightRadius', 1),
                        int('StatDefense', 15)
                    ]
                }
            },
            Eld: {
                name: 'Eld', number: 2, cLvl: 11,
                effects: {
                    weapon: [
                        pct('DamageUndead', 75),
                        int('ARUndead', 50)
                    ],
                    armorHelm: pct('LowerStaminaDrain', 15),
                    shield: pct('Blocking', 7)
                },
                craft: { runes: repeat('El', 3) }
            },
            Tir: {
                name: 'Tir', number: 3, cLvl: 13,
                effects: {
                    weapon: int('OnKillMana', 2),
                    armorHelm: int('OnKillMana', 2)
                },
                craft: { runes: repeat('Eld', 3) }
            },
            Nef: {
                name: 'Nef', number: 4, cLvl: 13,
                effects: {
                    weapon: int('KnockBack'),
                    armorHelm: int('StatDefenseMissile', 30)
                },
                craft: { runes: repeat('Tir', 3) }
            },
            Eth: {
                name: 'Eth', number: 5, cLvl: 15,
                effects: {
                    weapon: pct('DefenseTarget', -25),
                    armorHelm: pct('StatRegenMana', 15)
                },
                craft: { runes: repeat('Nef', 3) }
            },
            Ith: {
                name: 'Ith', number: 6, cLvl: 15,
                effects: {
                    weapon: int('DamageMaximum', 9),
                    armorHelm: pct('DamageToMana', 15)
                },
                craft: { runes: repeat('Eth', 3) }
            },
            Tal: {
                name: 'Tal', number: 7, cLvl: 17,
                effects: {
                    weapon: dot('DamagePoison', 75, 5),
                    armorHelm: pct('ResistPoison', 30),
                    shield: pct('ResistPoison', 35)
                },
                craft: { runes: repeat('Ith', 3) }
            },
            Ral: {
                name: 'Ral', number: 8, cLvl: 19,
                effects: {
                    weapon: rng('DamageFire', 5, 30),
                    armorHelm: pct('ResistFire', 30),
                    shield: pct('ResistFire', 35)
                },
                craft: { runes: repeat('Tal', 3) }
            },
            Ort: {
                name: 'Ort', number: 9, cLvl: 21,
                effects: {
                    weapon: rng('DamageLightning', 1, 50),
                    armorHelm: pct('ResistLightning', 30),
                    shield: pct('ResistLightning', 35)
                },
                craft: { runes: repeat('Ral', 3) }
            },
            Thul: {
                name: 'Thul', number: 10, cLvl: 23,
                effects: {
                    weapon: rng('DamageColdDuration', 3, 14, 3),
                    armorHelm: pct('ResistCold', 30),
                    shield: pct('ResistCold', 35)
                },
                craft: { runes: repeat('Ort', 3) }
            },
            Amn: {
                name: 'Amn', number: 11, cLvl: 25,
                effects: {
                    weapon: pct('LeechLife', 7),
                    armorHelm: int('Thorns', 14)
                },
                craft: { runes: repeat('Thul', 3), gems: gems.topaz.chipped }
            },
            Sol: {
                name: 'Sol', number: 12, cLvl: 27,
                effects: {
                    weapon: int('DamageMinimum', 9),
                    armorHelm: int('DamageTaken', -7)
                },
                craft: { runes: repeat('Amn', 3), gems: gems.amethyst.chipped }
            },
            Shael: {
                name: 'Shael', number: 13, cLvl: 29,
                effects: {
                    weapon: int('RateAttack', 20),
                    armorHelm: int('RateHitRecovery', 20),
                    shield: int('RateBlock', 20)
                },
                craft: { runes: repeat('Sol', 3), gems: gems.sapphire.chipped }
            },
            Dol: {
                name: 'Dol', number: 14, cLvl: 31,
                effects: {
                    weapon: pct('ChanceFear', 25),
                    armorHelm: int('StatRegenLife', 7)
                },
                craft: { runes: repeat('Shael', 3), gems: gems.ruby.chipped }
            },
            Hel: {
                name: 'Hel', number: 15, iLvl: 33, cLvl: 0,
                effects: {
                    weapon: pct('Requirements', -20),
                    armorHelm: pct('Requirements', -15)
                },
                craft: { runes: repeat('Dol', 3), gems: gems.emerald.chipped }
            },
            Io: {
                name: 'Io', number: 16, cLvl: 35,
                effects: {
                    weapon: int('StatVitality', 10),
                    armorHelm: int('StatVitality', 10)
                },
                craft: { runes: repeat('Hel', 3), gems: gems.diamond.chipped }
            },
            Lum: {
                name: 'Lum', number: 17, cLvl: 37,
                effects: {
                    weapon: int('StatEnergy', 10),
                    armorHelm: int('StatEnergy', 10)
                },
                craft: { runes: repeat('Io', 3), gems: gems.topaz.flawed }
            },
            Ko: {
                name: 'Ko', number: 18, cLvl: 39,
                effects: {
                    weapon: int('StatDexterity', 10),
                    armorHelm: int('StatDexterity', 10)
                },
                craft: { runes: repeat('Lum', 3), gems: gems.amethyst.flawed }
            },
            Fal: {
                name: 'Fal', number: 19, cLvl: 41,
                effects: {
                    weapon: int('StatStrength', 10),
                    armorHelm: int('StatStrength', 10)
                },
                craft: { runes: repeat('Ko', 3), gems: gems.sapphire.flawed }
            },
            Lem: {
                name: 'Lem', number: 20, cLvl: 43,
                effects: {
                    weapon: pct('ExtraGold', 75),
                    armorHelm: pct('ExtraGold', 50)
                },
                craft: { runes: repeat('Fal', 3), gems: gems.ruby.flawed }
            },
            Pul: {
                name: 'Pul', number: 21, cLvl: 45,
                effects: {
                    weapon: [pct('DamageDemons', 75), int('ARDemons', 100)],
                    armorHelm: pct('StatDefense', 30)
                },
                craft: { runes: repeat('Lem', 3), gems: gems.emerald.flawed }
            },
            Um: {
                name: 'Um', number: 22, cLvl: 47,
                effects: {
                    weapon: pct('ChanceOpenWounds', 25),
                    armorHelm: pct('ResistAll', 15),
                    shield: pct('ResistAll', 22)
                },
                craft: { runes: repeat('Pul', 2), gems: gems.diamond.flawed }
            },
            Mal: {
                name: 'Mal', number: 23, cLvl: 49,
                effects: {
                    weapon: int('PreventMonsterHealing'),
                    armorHelm: int('ReduceDamageMagic', 7)
                },
                craft: { runes: repeat('Um', 2), gems: gems.topaz.normal }
            },
            Ist: {
                name: 'Ist', number: 24, cLvl: 51,
                effects: {
                    weapon: pct('MagicFind', 30),
                    armorHelm: pct('MagicFind', 25)
                },
                craft: { runes: repeat('Mal', 2), gems: gems.amethyst.normal }
            },
            Gul: {
                name: 'Gul', number: 25, cLvl: 53,
                effects: {
                    weapon: pct('AR', 20),
                    armorHelm: int('ResistMaxPoison', 5)
                },
                craft: { runes: repeat('Ist', 2), gems: gems.sapphire.normal }
            },
            Vex: {
                name: 'Vex', number: 26, cLvl: 55,
                effects: {
                    weapon: pct('LeechMana', 7),
                    armorHelm: int('ResistMaxFire', 5)
                },
                craft: { runes: repeat('Gul', 2), gems: gems.ruby.normal }
            },
            Ohm: {
                name: 'Ohm', number: 27, cLvl: 57,
                effects: {
                    weapon: pct('Damage', 50),
                    armorHelm: int('ResistMaxCold', 5)
                },
                craft: { runes: repeat('Vex', 2), gems: gems.emerald.normal }
            },
            Lo: {
                name: 'Lo', number: 28, cLvl: 59,
                effects: {
                    weapon: pct('ChanceDeadlyStrike', 20),
                    armorHelm: int('ResistMaxLightning', 5)
                },
                craft: { runes: repeat('Ohm', 2), gems: gems.diamond.normal }
            },
            Sur: {
                name: 'Sur', number: 29, cLvl: 61,
                effects: {
                    weapon: pct('ChanceBlind', 20),
                    armorHelm: pct('StatManaTotal', 5),
                    shield: int('StatMana', 50)
                },
                craft: { runes: repeat('Lo', 2), gems: gems.topaz.flawless }
            },
            Ber: {
                name: 'Ber', number: 30, cLvl: 63,
                effects: {
                    weapon: pct('ChanceCrushingBlow', 20),
                    armorHelm: pct('ReduceDamage', 8)
                },
                craft: { runes: repeat('Sur', 2), gems: gems.amethyst.flawless }
            },
            Jah: {
                name: 'Jah', number: 31, cLvl: 65,
                effects: {
                    weapon: int('Piercing'),
                    armorHelm: pct('StatHPOfTotal', 5),
                    shield: int('StatHitPoints', 50)
                },
                craft: { runes: repeat('Ber', 2), gems: gems.sapphire.flawless }
            },
            Cham: {
                name: 'Cham', number: 32, cLvl: 67,
                effects: {
                    weapon: pct('ChanceFreeze', 32, 3),
                    armorHelm: int('CannotBeFrozen')
                },
                craft: { runes: repeat('Jah', 2), gems: gems.ruby.flawless }
            },
            Zod: {
                name: 'Zod', number: 33, cLvl: 69,
                effects: {
                    weapon: int('Indestructible'),
                    armorHelm: int('Indestructible')
                },
                craft: { runes: repeat('Cham', 2), gems: gems.emerald.flawless }
            }
        };
    }
}
