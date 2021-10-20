import { Injectable } from '@angular/core';
import { ArrayHelper, EffectHelper, GemHelper } from '~helpers';
import { IRuneMap } from '~interfaces/rune';
import { BaseEntityFactory } from './base-entity.factory';

@Injectable({ providedIn: 'root' })
export class RuneFactory extends BaseEntityFactory<IRuneMap> {
    constructor(private readonly gemHelper: GemHelper) {
        super();
    }

    public buildItems(): IRuneMap {
        const gems = this.gemHelper.getItems();

        const { repeat } = ArrayHelper;

        const effect = EffectHelper.effect;

        return {
            El: {
                name: 'El', number: 1, cLvl: 11,
                effects: {
                    weapon: [
                        effect('stat.attackRating', '+50'),
                        effect('stat.lightRadius', '+1')
                    ],
                    armorHelm: [
                        effect('stat.lightRadius', '+1'),
                        effect('stat.defense', '+1')
                    ]
                }
            },
            Eld: {
                name: 'Eld', number: 2, cLvl: 11,
                effects: {
                    weapon: [
                        effect('damage.undead', '+75'),
                        effect('stat.attackRatingUndead', '+50')
                    ],
                    armorHelm: effect('effect.staminaDrain', '15%'),
                    shield: effect('stat.block', '+7%')
                },
                craft: { runes: repeat('El', 3) }
            },
            Tir: {
                name: 'Tir', number: 3, cLvl: 13,
                effects: {
                    weapon: effect('on.kill.mana', '+2'),
                    armorHelm: effect('on.kill.mana', '+2')
                },
                craft: { runes: repeat('Eld', 3) }
            },
            Nef: {
                name: 'Nef', number: 4, cLvl: 13,
                effects: {
                    weapon: effect('effect.knockback'),
                    armorHelm: effect('effect.defenseMissile', '+30')
                },
                craft: { runes: repeat('Tir', 3) }
            },
            Eth: {
                name: 'Eth', number: 5, cLvl: 15,
                effects: {
                    weapon: effect('effect.targetDefense', '-25%'),
                    armorHelm: effect('effect.regenerateMana', '15%')
                },
                craft: { runes: repeat('Nef', 3) }
            },
            Ith: {
                name: 'Ith', number: 6, cLvl: 15,
                effects: {
                    weapon: effect('damage.max', '+9'),
                    armorHelm: effect('effect.damageToMana', '15%')
                },
                craft: { runes: repeat('Eth', 3) }
            },
            Tal: {
                name: 'Tal', number: 7, cLvl: 17,
                effects: {
                    weapon: effect('damage.poison', '+75', { duration: 5 }),
                    armorHelm: effect('resist.poison', '+30%'),
                    shield: effect('resist.poison', '+30%')
                },
                craft: { runes: repeat('Ith', 3) }
            },
            Ral: {
                name: 'Ral', number: 8, cLvl: 19,
                effects: {
                    weapon: effect('damage.fire', '5-30'),
                    armorHelm: effect('resist.fire', '+30%'),
                    shield: effect('resist.fire', '+30%')
                },
                craft: { runes: repeat('Tal', 3) }
            },
            Ort: {
                name: 'Ort', number: 9, cLvl: 21,
                effects: {
                    weapon: effect('damage.lightning', '1-60'),
                    armorHelm: effect('resist.lightning', '+30%'),
                    shield: effect('resist.lightning', '+30%')
                },
                craft: { runes: repeat('Ral', 3) }
            },
            Thul: {
                name: 'Thul', number: 10, cLvl: 23,
                effects: {
                    weapon: effect('damage.cold', '3-14'),
                    armorHelm: effect('resist.cold', '+30%'),
                    shield: effect('resist.cold', '+35%')
                },
                craft: { runes: repeat('Ort', 3) }
            },
            Amn: {
                name: 'Amn', number: 11, cLvl: 25,
                effects: {
                    weapon: effect('on.hit.stealLife', '7%'),
                    armorHelm: effect('effect.thorns', 14)
                },
                craft: { runes: repeat('Thul', 3), gems: gems.topaz.chipped }
            },
            Sol: {
                name: 'Sol', number: 12, cLvl: 27,
                effects: {
                    weapon: effect('damage.min', '+9'),
                    armorHelm: effect('absorb.damage', 7)
                },
                craft: { runes: repeat('Amn', 3), gems: gems.amethyst.chipped }
            },
            Shael: {
                name: 'Shael', number: 13, cLvl: 29,
                effects: {
                    weapon: effect('stat.attackSpeed', '+20%'),
                    armorHelm: effect('stat.rateHitRecovery', '+20%'),
                    shield: effect('stat.rateBlock', '+20%')
                },
                craft: { runes: repeat('Sol', 3), gems: gems.sapphire.chipped }
            },
            Dol: {
                name: 'Dol', number: 14, cLvl: 31,
                effects: {
                    weapon: effect('on.hit.fear', '25%'),
                    armorHelm: effect('effect.replenishLife', '+7')
                },
                craft: { runes: repeat('Shael', 3), gems: gems.ruby.chipped }
            },
            Hel: {
                name: 'Hel', number: 15, iLvl: 33, cLvl: 0,
                effects: {
                    weapon: effect('effect.requirements', '-20%'),
                    armorHelm: effect('effect.requirements', '-15%')
                },
                craft: { runes: repeat('Dol', 3), gems: gems.emerald.chipped }
            },
            Io: {
                name: 'Io', number: 16, cLvl: 35,
                effects: {
                    weapon: effect('stat.vitality', '+10'),
                    armorHelm: effect('stat.vitality', '+10')
                },
                craft: { runes: repeat('Hel', 3), gems: gems.diamond.chipped }
            },
            Lum: {
                name: 'Lum', number: 17, cLvl: 37,
                effects: {
                    weapon: effect('stat.energy', '+10'),
                    armorHelm: effect('stat.energy', '+10')
                },
                craft: { runes: repeat('Io', 3), gems: gems.topaz.flawed }
            },
            Ko: {
                name: 'Ko', number: 18, cLvl: 39,
                effects: {
                    weapon: effect('stat.dexterity', '+10'),
                    armorHelm: effect('stat.dexterity', '+10')
                },
                craft: { runes: repeat('Lum', 3), gems: gems.amethyst.flawed }
            },
            Fal: {
                name: 'Fal', number: 19, cLvl: 41,
                effects: {
                    weapon: effect('stat.strength', '+10'),
                    armorHelm: effect('stat.strength', '+10')
                },
                craft: { runes: repeat('Ko', 3), gems: gems.sapphire.flawed }
            },
            Lem: {
                name: 'Lem', number: 20, cLvl: 43,
                effects: {
                    weapon: effect('effect.GF', '+75%'),
                    armorHelm: effect('effect.GF', '+50%')
                },
                craft: { runes: repeat('Fal', 3), gems: gems.ruby.flawed }
            },
            Pul: {
                name: 'Pul', number: 21, cLvl: 45,
                effects: {
                    weapon: [effect('damage.demon', '+75%'), effect('stat.attackRatingDemon', '+100')],
                    armorHelm: effect('stat.defenseEnhanced', '+30%')
                },
                craft: { runes: repeat('Lem', 3), gems: gems.emerald.flawed }
            },
            Um: {
                name: 'Um', number: 22, cLvl: 47,
                effects: {
                    weapon: effect('chance.openWounds', '25%'),
                    armorHelm: effect('resist.all', '+15'),
                    shield: effect('resist.all', '+22')
                },
                craft: { runes: repeat('Pul', 2), gems: gems.diamond.flawed }
            },
            Mal: {
                name: 'Mal', number: 23, cLvl: 49,
                effects: {
                    weapon: effect('effect.preventHeal'),
                    armorHelm: effect('absorb.damageMagic', 7)
                },
                craft: { runes: repeat('Um', 2), gems: gems.topaz.normal }
            },
            Ist: {
                name: 'Ist', number: 24, cLvl: 51,
                effects: {
                    weapon: effect('effect.MF', '30%'),
                    armorHelm: effect('effect.MF', '25%')
                },
                craft: { runes: repeat('Mal', 2), gems: gems.amethyst.normal }
            },
            Gul: {
                name: 'Gul', number: 25, cLvl: 53,
                effects: {
                    weapon: effect('stat.attackRatingBonus', '20%'),
                    armorHelm: effect('resist.maxPoison', '+5%')
                },
                craft: { runes: repeat('Ist', 2), gems: gems.sapphire.normal }
            },
            Vex: {
                name: 'Vex', number: 26, cLvl: 55,
                effects: {
                    weapon: effect('on.hit.stealMana', '7%'),
                    armorHelm: effect('resist.maxFire', '+5%')
                },
                craft: { runes: repeat('Gul', 2), gems: gems.ruby.normal }
            },
            Ohm: {
                name: 'Ohm', number: 27, cLvl: 57,
                effects: {
                    weapon: effect('damage.enhanced', '+50%'),
                    armorHelm: effect('resist.maxCold', '+5%')
                },
                craft: { runes: repeat('Vex', 2), gems: gems.emerald.normal }
            },
            Lo: {
                name: 'Lo', number: 28, cLvl: 59,
                effects: {
                    weapon: effect('chance.deadlyStrike', '20%'),
                    armorHelm: effect('resist.maxLightning', '+5%')
                },
                craft: { runes: repeat('Ohm', 2), gems: gems.diamond.normal }
            },
            Sur: {
                name: 'Sur', number: 29, cLvl: 61,
                effects: {
                    weapon: effect('on.hit.blind'),
                    armorHelm: effect('stat.maxMana', '5%'),
                    shield: effect('stat.mana', '+50')
                },
                craft: { runes: repeat('Lo', 2), gems: gems.topaz.flawless }
            },
            Ber: {
                name: 'Ber', number: 30, cLvl: 63,
                effects: {
                    weapon: effect('chance.crushingBlow', '20%'),
                    armorHelm: effect('absorb.damage', '8%')
                },
                craft: { runes: repeat('Sur', 2), gems: gems.amethyst.flawless }
            },
            Jah: {
                name: 'Jah', number: 31, cLvl: 65,
                effects: {
                    weapon: effect('effect.ignoreDefense'),
                    armorHelm: effect('stat.maxLife', '5%'),
                    shield: effect('stat.life', '+50')
                },
                craft: { runes: repeat('Ber', 2), gems: gems.sapphire.flawless }
            },
            Cham: {
                name: 'Cham', number: 32, cLvl: 67,
                effects: {
                    weapon: effect('effect.freezeAmount', '+3'),
                    armorHelm: effect('absorb.freeze')
                },
                craft: { runes: repeat('Jah', 2), gems: gems.ruby.flawless }
            },
            Zod: {
                name: 'Zod', number: 33, cLvl: 69,
                effects: {
                    weapon: effect('effect.indestructible'),
                    armorHelm: effect('effect.indestructible')
                },
                craft: { runes: repeat('Cham', 2), gems: gems.emerald.flawless }
            }
        };
    }
}
