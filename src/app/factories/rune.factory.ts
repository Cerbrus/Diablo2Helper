import { Injectable } from '@angular/core';
import { ArrayHelper, EffectHelper, GemHelper } from '~helpers';
import { IRuneMap } from '~interfaces/rune';
import { TRune } from '~types/rune';
import { BaseEntityFactory } from './base-entity.factory';

@Injectable({ providedIn: 'root' })
export class RuneFactory extends BaseEntityFactory<IRuneMap> {
    constructor(private readonly gemHelper: GemHelper) {
        super();
    }

    private static key<T extends TRune>(
        name: T,
        number: number,
        cLvl: number
    ): { name: T; number: number; cLvl: number } {
        return { name, number, cLvl };
    }

    public buildItems(): IRuneMap {
        const gems = this.gemHelper.items;

        const { repeat } = ArrayHelper;
        const { key } = RuneFactory;
        const effect = EffectHelper.effect;

        return {
            El: {
                ...key('El', 1, 11),
                effects: {
                    weapon: [effect('stat.attackRating', '+50'), effect('stat.lightRadius', '+1')],
                    armorHelm: [effect('stat.lightRadius', '+1'), effect('stat.defense', '+1')]
                }
            },
            Eld: {
                ...key('Eld', 2, 11),
                effects: {
                    weapon: [effect('damage.undead', '+75'), effect('stat.attackRatingUndead', '+50')],
                    armorHelm: effect('effect.staminaDrain', '15%'),
                    shield: effect('stat.block', '+7%')
                },
                craft: { runes: repeat('El', 3) }
            },
            Tir: {
                ...key('Tir', 3, 13),
                effects: {
                    weapon: effect('on.kill.mana', '+2'),
                    armorHelm: effect('on.kill.mana', '+2')
                },
                craft: { runes: repeat('Eld', 3) }
            },
            Nef: {
                ...key('Nef', 4, 13),
                effects: {
                    weapon: effect('effect.knockback'),
                    armorHelm: effect('effect.defenseMissile', '+30')
                },
                craft: { runes: repeat('Tir', 3) }
            },
            Eth: {
                ...key('Eth', 5, 15),
                effects: {
                    weapon: effect('effect.targetDefense', '-25%'),
                    armorHelm: effect('effect.regenerateMana', '15%')
                },
                craft: { runes: repeat('Nef', 3) }
            },
            Ith: {
                ...key('Ith', 6, 15),
                effects: {
                    weapon: effect('damage.max', '+9'),
                    armorHelm: effect('effect.damageToMana', '15%')
                },
                craft: { runes: repeat('Eth', 3) }
            },
            Tal: {
                ...key('Tal', 7, 17),
                effects: {
                    weapon: effect('damage.poison', '+75', { duration: 5 }),
                    armorHelm: effect('resist.poison', '+30%'),
                    shield: effect('resist.poison', '+30%')
                },
                craft: { runes: repeat('Ith', 3) }
            },
            Ral: {
                ...key('Ral', 8, 19),
                effects: {
                    weapon: effect('damage.fire', '5-30'),
                    armorHelm: effect('resist.fire', '+30%'),
                    shield: effect('resist.fire', '+30%')
                },
                craft: { runes: repeat('Tal', 3) }
            },
            Ort: {
                ...key('Ort', 9, 21),
                effects: {
                    weapon: effect('damage.lightning', '1-60'),
                    armorHelm: effect('resist.lightning', '+30%'),
                    shield: effect('resist.lightning', '+30%')
                },
                craft: { runes: repeat('Ral', 3) }
            },
            Thul: {
                ...key('Thul', 10, 23),
                effects: {
                    weapon: effect('damage.cold', '3-14'),
                    armorHelm: effect('resist.cold', '+30%'),
                    shield: effect('resist.cold', '+35%')
                },
                craft: { runes: repeat('Ort', 3) }
            },
            Amn: {
                ...key('Amn', 11, 25),
                effects: {
                    weapon: effect('on.hit.stealLife', '7%'),
                    armorHelm: effect('effect.thorns', 14)
                },
                craft: { runes: repeat('Thul', 3), gems: gems.topaz.chipped }
            },
            Sol: {
                ...key('Sol', 12, 27),
                effects: {
                    weapon: effect('damage.min', '+9'),
                    armorHelm: effect('absorb.damage', 7)
                },
                craft: { runes: repeat('Amn', 3), gems: gems.amethyst.chipped }
            },
            Shael: {
                ...key('Shael', 13, 29),
                effects: {
                    weapon: effect('stat.attackSpeed', '+20%'),
                    armorHelm: effect('stat.rateHitRecovery', '+20%'),
                    shield: effect('stat.rateBlock', '+20%')
                },
                craft: { runes: repeat('Sol', 3), gems: gems.sapphire.chipped }
            },
            Dol: {
                ...key('Dol', 14, 31),
                effects: {
                    weapon: effect('on.hit.fear', '25%'),
                    armorHelm: effect('effect.replenishLife', '+7')
                },
                craft: { runes: repeat('Shael', 3), gems: gems.ruby.chipped }
            },
            Hel: {
                name: 'Hel',
                number: 15,
                iLvl: 33,
                cLvl: 0,
                effects: {
                    weapon: effect('effect.requirements', '-20%'),
                    armorHelm: effect('effect.requirements', '-15%')
                },
                craft: { runes: repeat('Dol', 3), gems: gems.emerald.chipped }
            },
            Io: {
                ...key('Io', 16, 35),
                effects: {
                    weapon: effect('stat.vitality', '+10'),
                    armorHelm: effect('stat.vitality', '+10')
                },
                craft: { runes: repeat('Hel', 3), gems: gems.diamond.chipped }
            },
            Lum: {
                ...key('Lum', 17, 37),
                effects: {
                    weapon: effect('stat.energy', '+10'),
                    armorHelm: effect('stat.energy', '+10')
                },
                craft: { runes: repeat('Io', 3), gems: gems.topaz.flawed }
            },
            Ko: {
                ...key('Ko', 18, 39),
                effects: {
                    weapon: effect('stat.dexterity', '+10'),
                    armorHelm: effect('stat.dexterity', '+10')
                },
                craft: { runes: repeat('Lum', 3), gems: gems.amethyst.flawed }
            },
            Fal: {
                ...key('Fal', 19, 41),
                effects: {
                    weapon: effect('stat.strength', '+10'),
                    armorHelm: effect('stat.strength', '+10')
                },
                craft: { runes: repeat('Ko', 3), gems: gems.sapphire.flawed }
            },
            Lem: {
                ...key('Lem', 20, 43),
                effects: {
                    weapon: effect('effect.GF', '+75%'),
                    armorHelm: effect('effect.GF', '+50%')
                },
                craft: { runes: repeat('Fal', 3), gems: gems.ruby.flawed }
            },
            Pul: {
                ...key('Pul', 21, 45),
                effects: {
                    weapon: [effect('damage.demon', '+75%'), effect('stat.attackRatingDemon', '+100')],
                    armorHelm: effect('stat.defenseEnhanced', '+30%')
                },
                craft: { runes: repeat('Lem', 3), gems: gems.emerald.flawed }
            },
            Um: {
                ...key('Um', 22, 47),
                effects: {
                    weapon: effect('chance.openWounds', '25%'),
                    armorHelm: effect('resist.all', '+15'),
                    shield: effect('resist.all', '+22')
                },
                craft: { runes: repeat('Pul', 2), gems: gems.diamond.flawed }
            },
            Mal: {
                ...key('Mal', 23, 49),
                effects: {
                    weapon: effect('effect.preventHeal'),
                    armorHelm: effect('absorb.damageMagic', 7)
                },
                craft: { runes: repeat('Um', 2), gems: gems.topaz.normal }
            },
            Ist: {
                ...key('Ist', 24, 51),
                effects: {
                    weapon: effect('effect.MF', '30%'),
                    armorHelm: effect('effect.MF', '25%')
                },
                craft: { runes: repeat('Mal', 2), gems: gems.amethyst.normal }
            },
            Gul: {
                ...key('Gul', 25, 53),
                effects: {
                    weapon: effect('stat.attackRatingBonus', '20%'),
                    armorHelm: effect('resist.maxPoison', '+5%')
                },
                craft: { runes: repeat('Ist', 2), gems: gems.sapphire.normal }
            },
            Vex: {
                ...key('Vex', 26, 55),
                effects: {
                    weapon: effect('on.hit.stealMana', '7%'),
                    armorHelm: effect('resist.maxFire', '+5%')
                },
                craft: { runes: repeat('Gul', 2), gems: gems.ruby.normal }
            },
            Ohm: {
                ...key('Ohm', 27, 57),
                effects: {
                    weapon: effect('damage.enhanced', '+50%'),
                    armorHelm: effect('resist.maxCold', '+5%')
                },
                craft: { runes: repeat('Vex', 2), gems: gems.emerald.normal }
            },
            Lo: {
                ...key('Lo', 28, 59),
                effects: {
                    weapon: effect('chance.deadlyStrike', '20%'),
                    armorHelm: effect('resist.maxLightning', '+5%')
                },
                craft: { runes: repeat('Ohm', 2), gems: gems.diamond.normal }
            },
            Sur: {
                ...key('Sur', 29, 61),
                effects: {
                    weapon: effect('on.hit.blind'),
                    armorHelm: effect('stat.maxMana', '5%'),
                    shield: effect('stat.mana', '+50')
                },
                craft: { runes: repeat('Lo', 2), gems: gems.topaz.flawless }
            },
            Ber: {
                ...key('Ber', 30, 63),
                effects: {
                    weapon: effect('chance.crushingBlow', '20%'),
                    armorHelm: effect('absorb.damage', '8%')
                },
                craft: { runes: repeat('Sur', 2), gems: gems.amethyst.flawless }
            },
            Jah: {
                ...key('Jah', 31, 65),
                effects: {
                    weapon: effect('effect.ignoreDefense'),
                    armorHelm: effect('stat.maxLife', '5%'),
                    shield: effect('stat.life', '+50')
                },
                craft: { runes: repeat('Ber', 2), gems: gems.sapphire.flawless }
            },
            Cham: {
                ...key('Cham', 32, 67),
                effects: {
                    weapon: effect('effect.freezeAmount', '+3'),
                    armorHelm: effect('absorb.freeze')
                },
                craft: { runes: repeat('Jah', 2), gems: gems.ruby.flawless }
            },
            Zod: {
                ...key('Zod', 33, 69),
                effects: {
                    weapon: effect('effect.indestructible'),
                    armorHelm: effect('effect.indestructible')
                },
                craft: { runes: repeat('Cham', 2), gems: gems.emerald.flawless }
            }
        };
    }
}
