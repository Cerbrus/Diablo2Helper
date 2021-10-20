// noinspection SpellCheckingInspection

import { Injectable } from '@angular/core';
import { EffectOptions, EffectType } from '~enums';
import { EffectHelper, GemHelper, ObjectHelper, RuneHelper } from '~helpers';
import { IRuneWordMap } from '~interfaces/runeWord';
import { StorageService } from '~services';
import { TItem } from '~types';
import { TRune } from '~types/rune';
import { BaseEntityFactory } from './base-entity.factory';

@Injectable({ providedIn: 'root' })
export class RuneWordFactory extends BaseEntityFactory<IRuneWordMap> {
    private bows: Array<TItem> = ['bow', 'crossbow'];

    constructor(
        private readonly runeHelper: RuneHelper,
        private readonly gemHelper: GemHelper,
        private readonly storageService: StorageService
    ) {
        super();
    }

    // noinspection JSMethodCanBeStatic
    private all(...itemsTypes: Array<TItem>): Array<TItem> {
        return ['all', ...itemsTypes];
    }

    private runes(...runes: Array<TRune>): { runes: Array<TRune>, cLvl: number } {
        return {
            runes,
            cLvl: Math.max(...runes.map(r => this.runeHelper.asItem(r).cLvl))
        };
    }

    public buildItems(): IRuneWordMap {
        const owned = this.storageService.get.runeWordsOwned();

        const { all, bows } = this;
        const runes = this.runes.bind(this);
        const effect = EffectHelper.effect;

        const runeWords: IRuneWordMap = {
            'Ancient\'s Pledge': {
                name: 'Ancient\'s Pledge',
                itemTypes: all('shield'),
                ...runes('Ral', 'Ort', 'Tal'),
                effects: [
                    effect('stat.defenseEnhanced', '+50%'),
                    effect('resist.cold', '+43%'),
                    effect('resist.lightning', '+48%'),
                    effect('resist.fire', '+48%'),
                    effect('resist.poison', '+48%'),
                    effect('effect.damageToMana', '10%')
                ]
            },
            Beast: {
                name: 'Beast',
                itemTypes: ['axe', 'hammer', 'scepter'],
                ...runes('Ber', 'Tir', 'Um', 'Mal', 'Lum'),
                effects: [
                    effect('skill.aura', 9, { skill: 'Fanaticism' }),
                    effect('stat.attackSpeed', '+40%'),
                    effect('damage.enhanced', '+240-270%', EffectOptions.Varies),
                    effect('chance.crushingBlow', '20%'),
                    effect('chance.openWounds', '25%'),
                    effect('skill.skill', 3, { skill: 'Werebear' }),
                    effect('skill.skill', 3, { skill: 'Lycanthropy' }),
                    'effect.preventHeal',
                    effect('stat.strength', '+25-40', EffectOptions.Varies),
                    effect('stat.energy', '+10'),
                    effect('on.kill.mana', '+2'),
                    effect('skill.charges', 5, { skill: 'Summon Grizzly', level: 13 })
                ]
            },
            Black: {
                name: 'Black',
                itemTypes: ['club', 'mace', 'hammer'],
                ...runes('Thul', 'Io', 'Nef'),
                effects: [
                    effect('stat.attackSpeed', '+15%'),
                    effect('damage.enhanced', '+120%'),
                    effect('stat.attackRating', '+200'),
                    effect('damage.cold', '3-14'),
                    effect('chance.crushingBlow', '40%'),
                    effect('effect.knockback', EffectType.Effect),
                    effect('stat.vitality', '+10'),
                    effect('absorb.damageMagic', 2),
                    effect('skill.charges', 12, { skill: 'Corpse Explosion', level: 4 })
                ]
            },
            Bone: {
                name: 'Bone',
                itemTypes: 'armorBody',
                ...runes('Sol', 'Um', 'Um'),
                effects: [
                    effect('chance.struck', '15%', { level: 10, skill: 'Bone Armor' }),
                    effect('chance.strike', '15%', { level: 10, skill: 'Bone Spear' }),
                    effect('skill.levels', 2, { class: 'necromancer' }),
                    effect('stat.mana', '+100-150', EffectOptions.Varies),
                    effect('resist.all', '+30'),
                    effect('absorb.damage', 7)
                ]
            },
            Bramble: {
                name: 'Bramble',
                itemTypes: 'armorBody',
                ...runes('Ral', 'Ohm', 'Sur', 'Eth'),
                effects: [
                    effect('skill.aura', '15-21', EffectOptions.Varies, { skill: 'Thorns' }),
                    effect('stat.rateHitRecovery', '+50%'),
                    effect('damage.poisonSkill', '+25-50%', EffectOptions.Varies),
                    effect('stat.defense', '+300'),
                    effect('stat.maxMana', '5%'),
                    effect('effect.regenerateMana', '15%'),
                    effect('resist.maxCold', '+5%'),
                    effect('resist.fire', '+30%'),
                    effect('resist.poison', '+100%'),
                    effect('on.kill.life', '+13'),
                    effect('skill.charges', 33, { skill: 'Spirit of Barbs', level: 13 })
                ]
            },
            Brand: {
                name: 'Brand',
                itemTypes: bows,
                ...runes('Jah', 'Lo', 'Mal', 'Gul'),
                effects: [
                    effect('chance.struck', '35%', { level: 14, skill: 'Amplify Damage' }),
                    effect('chance.strike', '100%', { level: 18, skill: 'Bone Spear' }),
                    'effect.explosiveProjectile',
                    effect('damage.enhanced', '+260-340%', EffectOptions.Varies),
                    'effect.ignoreDefense',
                    effect('stat.attackRatingBonus', '20%'),
                    effect('damage.demon', '+280-330%', EffectOptions.Varies),
                    effect('chance.deadlyStrike', '20%'),
                    'effect.preventHeal',
                    'effect.knockback'
                ]
            },
            'Breath of the Dying': {
                name: 'Breath of the Dying',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Vex', 'Hel', 'El', 'Eld', 'Zod', 'Eth'),
                effects: [
                    effect('chance.kill', '50%', { level: 20, skill: 'Poison Nova' }),
                    'effect.indestructible',
                    effect('stat.attackSpeed', '+60%'),
                    effect('damage.enhanced', '+350-400%', EffectOptions.Varies),
                    effect('effect.targetDefense', '-25%'),
                    effect('stat.attackRating', '+50'),
                    effect('damage.undead', '+200%'),
                    effect('stat.attackRatingUndead', '+50'),
                    effect('on.hit.stealMana', '7%'),
                    effect('on.hit.stealLife', '12-15%', EffectOptions.Varies),
                    'effect.preventHeal',
                    effect('stat.all', '+30'),
                    effect('stat.lightRadius', '+1'),
                    effect('effect.requirements', '-20%')
                ]
            },
            'Call to Arms': {
                name: 'Call to Arms',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Amn', 'Ral', 'Mal', 'Ist', 'Ohm'),
                effects: [
                    effect('skill.skill', '+1', { skill: 'All Skills' }),
                    effect('stat.attackSpeed', '+40%'),
                    effect('damage.enhanced', '+240-290%', EffectOptions.Varies),
                    effect('damage.fire', '5-30'),
                    effect('on.hit.stealLife', '7%'),
                    effect('skill.skill', '+2-6', EffectOptions.Varies, { skill: 'Battle Command' }),
                    effect('skill.skill', '+1-6', EffectOptions.Varies, { skill: 'Battle Orders' }),
                    effect('skill.skill', '+1-4', EffectOptions.Varies, { skill: 'Battle Cry' }),
                    'effect.preventHeal',
                    effect('effect.replenishLife', '+12'),
                    effect('effect.MF', '30%')
                ]
            },
            'Chains of Honor': {
                name: 'Chains of Honor',
                itemTypes: 'armorBody',
                ...runes('Dol', 'Um', 'Ber', 'Ist'),
                effects: [
                    effect('skill.skill', '+2', { skill: 'All Skills' }),
                    effect('damage.demon', '+200%'),
                    effect('damage.undead', '+100%'),
                    effect('on.hit.stealLife', '8%'),
                    effect('stat.defenseEnhanced', '+70%'),
                    effect('stat.strength', '+20'),
                    effect('effect.replenishLife', '+7'),
                    effect('resist.all', '+65'),
                    effect('absorb.damage', '8%'),
                    effect('effect.MF', '25%')
                ]
            },
            Chaos: {
                name: 'Chaos',
                itemTypes: 'claw',
                ...runes('Fal', 'Ohm', 'Um'),
                effects: [
                    effect('chance.strike', '9%', { level: 11, skill: 'Frozen Orb' }),
                    effect('chance.strike', '11%', { level: 9, skill: 'Charged Bolt' }),
                    effect('stat.attackSpeed', '+35%'),
                    effect('damage.enhanced', '+240-290%', EffectOptions.Varies),
                    effect('damage.magic', '216-471'),
                    effect('chance.openWounds', '25%'),
                    effect('skill.skill', '+1', { skill: 'Whirlwind' }),
                    effect('stat.strength', '+10'),
                    effect('on.kill.lifeDemon', '+15')
                ]
            },
            'Crescent Moon': {
                name: 'Crescent Moon',
                itemTypes: ['axe', 'poleArm', 'sword'],
                ...runes('Shael', 'Um', 'Tir'),
                effects: [
                    effect('chance.strike', '10%', { level: 17, skill: 'Chain Lightning' }),
                    effect('chance.strike', '7%', { level: 13, skill: 'Static Field' }),
                    effect('stat.attackSpeed', '+20%'),
                    effect('damage.enhanced', '+180-220%', EffectOptions.Varies),
                    'effect.ignoreDefense',
                    effect('resist.enemyLightning', '-35%'),
                    effect('chance.openWounds', '25%'),
                    effect('absorb.magic', '+9-11', EffectOptions.Varies),
                    effect('on.kill.mana', '+2'),
                    effect('skill.charges', 30, { skill: 'Summon Spirit Wolf', level: 18 })
                ]
            },
            Death: {
                name: 'Death',
                itemTypes: ['sword', 'axe'],
                ...runes('Hel', 'El', 'Vex', 'Ort', 'Gul'),
                effects: [
                    'effect.indestructible',
                    effect('chance.die', '100%', { level: 44, skill: 'Chain Lightning' }),
                    effect('chance.attack', '25%', { level: 18, skill: 'Glacial Spike' }),
                    effect('damage.enhanced', '+300-385%', EffectOptions.Varies),
                    effect('stat.attackRatingBonus', '20%'),
                    effect('stat.attackRating', '+50'),
                    effect('damage.lightning', '1-50'),
                    effect('on.hit.stealMana', '7%'),
                    effect('chance.crushingBlow', '50%'),
                    effect('chance.deadlyStrike', '(0.5*Clvl)%', EffectOptions.CharLvl),
                    effect('stat.lightRadius', '+1'),
                    effect('skill.charges', 15, { skill: 'Blood Golem', level: 22 }),
                    effect('effect.requirements', '-20%')
                ]
            },
            Delirium: {
                name: 'Delirium',
                itemTypes: all('armorHead'),
                ...runes('Lem', 'Ist', 'Io'),
                effects: [
                    effect('chance.struck', '1%', { level: 50, skill: 'Delirium' }),
                    effect('chance.struck', '6%', { level: 14, skill: 'Mind Blast' }),
                    effect('chance.struck', '14%', { level: 13, skill: 'Terror' }),
                    effect('chance.strike', '11%', { level: 18, skill: 'Confuse' }),
                    effect('skill.skill', '+2', { skill: 'All Skills' }),
                    effect('stat.defense', '+261'),
                    effect('stat.vitality', '+10'),
                    effect('effect.GF', '50%'),
                    effect('effect.MF', '25%'),
                    effect('skill.charges', 60, { skill: 'Attract', level: 17 })
                ]
            },
            Destruction: {
                name: 'Destruction',
                itemTypes: ['poleArm', 'sword'],
                ...runes('Vex', 'Lo', 'Ber', 'Jah', 'Ko'),
                effects: [
                    effect('chance.strike', '23%', { level: 12, skill: 'Volcano' }),
                    effect('chance.strike', '5%', { level: 23, skill: 'Molten Boulder' }),
                    effect('chance.die', '100%', { level: 45, skill: 'Meteor' }),
                    effect('chance.attack', '15%', { level: 22, skill: 'Nova' }),
                    effect('damage.enhanced', '+350%'),
                    'effect.ignoreDefense',
                    effect('damage.magic', '100-180'),
                    effect('on.hit.stealMana', '7%'),
                    effect('chance.crushingBlow', '20%'),
                    effect('chance.deadlyStrike', '20%'),
                    'effect.preventHeal',
                    effect('stat.dexterity', '+10')
                ]
            },
            Doom: {
                name: 'Doom',
                itemTypes: ['axe', 'hammer', 'poleArm'],
                ...runes('Hel', 'Ohm', 'Um', 'Lo', 'Cham'),
                effects: [
                    effect('chance.strike', '5%', { level: 18, skill: 'Volcano' }),
                    effect('skill.aura', 12, { skill: 'Holy Freeze' }),
                    effect('skill.skill', '+2', { skill: 'All Skills' }),
                    effect('stat.attackSpeed', '+45%'),
                    effect('damage.enhanced', '+330-370%', EffectOptions.Varies),
                    effect('resist.enemyCold', '-40-60%', EffectOptions.Varies),
                    effect('chance.deadlyStrike', '20%'),
                    effect('chance.openWounds', '25%'),
                    'effect.preventHeal',
                    effect('effect.freezeAmount', '+3'),
                    effect('effect.requirements', '-20%')
                ]
            },
            Dragon: {
                name: 'Dragon',
                itemTypes: all('armorBody', 'shield'),
                ...runes('Sur', 'Lo', 'Sol'),
                effects: [
                    'appliesTo.both',
                    effect('chance.struck', '20%', { level: 18, skill: 'Venom' }),
                    effect('chance.strike', '12%', { level: 15, skill: 'Hydra' }),
                    effect('skill.aura', 14, { skill: 'Holy Fire' }),
                    effect('stat.defense', '+360'),
                    effect('effect.defenseMissile', '+230'),
                    effect('stat.all', '+3-5', EffectOptions.Varies),
                    effect('stat.strength', '+(0.375*Clvl)', EffectOptions.CharLvl),
                    effect('resist.maxLightning', '+5%'),
                    effect('absorb.damage', 7),
                    'appliesTo.armor',
                    effect('stat.maxMana', '5%'),
                    'appliesTo.shields',
                    effect('stat.mana', '+50')
                ]
            },
            Dream: {
                name: 'Dream',
                itemTypes: all('shield', 'armorHead'),
                ...runes('Io', 'Jah', 'Pul'),
                effects: [
                    'appliesTo.both',
                    effect('chance.struck', '10%', { level: 15, skill: 'Confuse' }),
                    effect('skill.aura', 15, { skill: 'Holy Shock' }),
                    effect('stat.rateHitRecovery', '+20-30%', EffectOptions.Varies),
                    effect('stat.defenseEnhanced', '+30%'),
                    effect('stat.defense', '+150-220', EffectOptions.Varies),
                    effect('stat.vitality', '+10'),
                    effect('stat.mana', '+(0.625*Clvl)', EffectOptions.CharLvl),
                    effect('resist.all', '+5-20', EffectOptions.Varies),
                    effect('effect.MF', '12-25%', EffectOptions.Varies),
                    'appliesTo.headgear',
                    effect('stat.maxLife', '5%'),
                    'appliesTo.shields',
                    effect('stat.life', '+50')
                ]
            },
            Duress: {
                name: 'Duress',
                itemTypes: 'armorBody',
                ...runes('Shael', 'Um', 'Thul'),
                effects: [
                    effect('stat.rateHitRecovery', '40%'),
                    effect('damage.enhanced', '+10-20%', EffectOptions.Varies),
                    effect('damage.cold', '37-133'),
                    effect('chance.crushingBlow', '15%'),
                    effect('chance.openWounds', '33%'),
                    effect('stat.defenseEnhanced', '+150-200%', EffectOptions.Varies),
                    effect('effect.staminaDrain', '-20%'),
                    effect('resist.cold', '+45%'),
                    effect('resist.lightning', '+15%'),
                    effect('resist.fire', '+15%'),
                    effect('resist.poison', '+15%')
                ]
            },
            Edge: {
                name: 'Edge',
                itemTypes: bows,
                ...runes('Tir', 'Tal', 'Amn'),
                effects: [
                    effect('skill.aura', 15, { skill: 'Thorns' }),
                    effect('stat.attackSpeed', '+35%'),
                    effect('damage.demon', '+320-380%', EffectOptions.Varies),
                    effect('damage.undead', '+280%'),
                    effect('damage.poison', '+75', { duration: 5 }),
                    effect('on.hit.stealLife', '7%'),
                    'effect.preventHeal',
                    effect('stat.all', '+5-10', EffectOptions.Varies),
                    effect('on.kill.mana', '+2'),
                    effect('effect.discount', '15%')
                ]
            },
            Enigma: {
                name: 'Enigma',
                itemTypes: 'armorBody',
                ...runes('Jah', 'Ith', 'Ber'),
                effects: [
                    effect('skill.skill', '+2', { skill: 'All Skills' }),
                    effect('stat.runSpeed', '+45%'),
                    effect('skill.skill', '+1', { skill: 'Teleport' }),
                    effect('stat.defense', '+750-775', EffectOptions.Varies),
                    effect('stat.strength', '+(0.75*Clvl)', EffectOptions.CharLvl),
                    effect('stat.maxLife', '5%'),
                    effect('absorb.damage', '8%'),
                    effect('on.kill.life', '+14'),
                    effect('effect.damageToMana', '15%'),
                    effect('effect.MF', '(1*Clvl)%', EffectOptions.CharLvl)
                ]
            },
            Enlightenment: {
                name: 'Enlightenment',
                itemTypes: 'armorBody',
                ...runes('Pul', 'Ral', 'Sol'),
                effects: [
                    effect('chance.struck', '5%', { level: 15, skill: 'Blaze' }),
                    effect('chance.strike', '5%', { level: 15, skill: 'Fire Ball' }),
                    effect('skill.levels', '+2', { class: 'sorceress' }),
                    effect('skill.skill', '+1', { skill: 'Warmth' }),
                    effect('stat.defenseEnhanced', '+30%'),
                    effect('resist.fire', '+30%'),
                    effect('absorb.damage', 7)
                ]
            },
            Eternity: {
                name: 'Eternity',
                itemTypes: all('weaponsMelee'),
                ...runes('Amn', 'Ber', 'Ist', 'Sol', 'Sur'),
                effects: [
                    'effect.indestructible',
                    effect('damage.enhanced', '+260-310%', EffectOptions.Varies),
                    effect('damage.min', '+9'),
                    effect('on.hit.stealLife', '7%'),
                    effect('chance.crushingBlow', '20%'),
                    'on.hit.blind',
                    effect('effect.slow', '33%'),
                    effect('effect.replenishMana', '16%'),
                    'absorb.freeze',
                    effect('effect.MF', '30%'),
                    effect('skill.charges', 88, { skill: 'Revive', level: 8 })
                ]
            },
            Exile: {
                name: 'Exile',
                itemTypes: 'paladinShield',
                ...runes('Vex', 'Ohm', 'Ist', 'Dol'),
                effects: [
                    effect('chance.strike', '15%', { level: 5, skill: 'Life Tap' }),
                    effect('skill.aura', '13-16', EffectOptions.Varies, { skill: 'Defiance' }),
                    effect('skill.class', '+2', { skill: 'Offensive Auras', class: 'paladin' }),
                    effect('stat.rateBlock', '+30%'),
                    'effect.freeze',
                    effect('stat.defenseEnhanced', '+220-260%', EffectOptions.Varies),
                    effect('effect.replenishLife', '+7'),
                    effect('resist.maxCold', '+5%'),
                    effect('resist.maxFire', '+5%'),
                    effect('effect.MF', '25%'),
                    'effect.repair'
                ]
            },
            Faith: {
                name: 'Faith',
                itemTypes: bows,
                ...runes('Ohm', 'Jah', 'Lem', 'Eld'),
                effects: [
                    effect('skill.aura', '12-15', EffectOptions.Varies, { skill: 'Fanaticism' }),
                    effect('skill.skill', '+1-2', EffectOptions.Varies, { skill: 'All Skills' }),
                    effect('damage.enhanced', '+330%'),
                    'effect.ignoreDefense',
                    effect('stat.attackRatingBonus', '300%'),
                    effect('damage.undead', '+75%'),
                    effect('stat.attackRatingUndead', '+50'),
                    effect('damage.fireShort', '+120'),
                    effect('resist.all', '+15'),
                    effect('effect.reanimate', '10%'),
                    effect('effect.GF', '75%')
                ]
            },
            Famine: {
                name: 'Famine',
                itemTypes: ['axe', 'hammer'],
                ...runes('Fal', 'Ohm', 'Ort', 'Jah'),
                effects: [
                    effect('stat.attackSpeed', '+30%'),
                    effect('damage.enhanced', '+320-370%', EffectOptions.Varies),
                    'effect.ignoreDefense',
                    effect('damage.magic', '180-200'),
                    effect('damage.fire', '50-200'),
                    effect('damage.lightning', '51-250'),
                    effect('damage.cold', '50-200'),
                    effect('on.hit.stealLife', '12%'),
                    'effect.preventHeal',
                    effect('stat.strength', '+10')
                ]
            },
            Fortitude: {
                name: 'Fortitude',
                itemTypes: all('weaponsRanged', 'weaponsMelee', 'armorBody'),
                ...runes('El', 'Sol', 'Dol', 'Lo'),
                effects: [
                    'appliesTo.both',
                    effect('chance.struck', '20%', { level: 15, skill: 'Chilling Armor' }),
                    effect('stat.rateCast', '+25%'),
                    effect('damage.enhanced', '+300%'),
                    effect('stat.defenseEnhanced', '+200%'),
                    effect('stat.life', '+((8-12)*0.125*Clvl)', EffectOptions.CharLvl | EffectOptions.Varies),
                    effect('resist.all', '+25-30', EffectOptions.Varies),
                    effect('effect.damageToMana', '12%'),
                    effect('stat.lightRadius', '+1'),
                    'appliesTo.weapons',
                    effect('damage.min', '+9'),
                    effect('stat.attackRating', '+50'),
                    effect('chance.deadlyStrike', '20%'),
                    effect('on.hit.fear', '25%'),
                    'appliesTo.armor',
                    effect('stat.defense', '+15'),
                    effect('effect.replenishLife', '+7'),
                    effect('resist.maxLightning', '+5%'),
                    effect('absorb.damage', 7)
                ]
            },
            Fury: {
                name: 'Fury',
                itemTypes: all('weaponsMelee'),
                ...runes('Jah', 'Gul', 'Eth'),
                effects: [
                    effect('stat.attackSpeed', '40%'),
                    effect('damage.enhanced', '+209%'),
                    'effect.ignoreDefense',
                    effect('effect.targetDefense', '-25%'),
                    effect('stat.attackRatingBonus', '20% '),
                    effect('on.hit.stealLife', '6%'),
                    effect('chance.deadlyStrike', '33%'),
                    effect('chance.openWounds', '66%'),
                    effect('skill.class', '+5', { skill: 'Frenzy', class: 'barbarian' }),
                    'effect.preventHeal'
                ]
            },
            Gloom: {
                name: 'Gloom',
                itemTypes: 'armorBody',
                ...runes('Fal', 'Um', 'Pul'),
                effects: [
                    effect('chance.struck', '15%', { level: 3, skill: 'Dim Vision' }),
                    effect('stat.rateHitRecovery', '+10%'),
                    effect('stat.defenseEnhanced', '+200-260%', EffectOptions.Varies),
                    effect('stat.strength', '+10'),
                    effect('resist.all', '+45'),
                    'absorb.freezeHalf',
                    effect('effect.damageToMana', '5%'),
                    effect('stat.lightRadius', -3)
                ]
            },
            Grief: {
                name: 'Grief',
                itemTypes: ['sword', 'axe'],
                ...runes('Eth', 'Tir', 'Lo', 'Mal', 'Ral'),
                effects: [
                    effect('chance.strike', '35%', { level: 15, skill: 'Venom' }),
                    effect('stat.attackSpeed', '+30-40%', EffectOptions.Varies),
                    effect('damage.damage', '+340-400', EffectOptions.Varies),
                    'effect.ignoreDefense',
                    effect('effect.targetDefense', '-25%'),
                    effect('damage.demon', '+(1.875*Clvl)%', EffectOptions.CharLvl),
                    effect('damage.fire', '5-30'),
                    effect('resist.enemyPoison', '-20-25%', EffectOptions.Varies),
                    effect('chance.deadlyStrike', '20%'),
                    'effect.preventHeal',
                    effect('on.kill.mana', '+2'),
                    effect('on.kill.life', '+10-15', EffectOptions.Varies)
                ]
            },
            'Hand of Justice': {
                name: 'Hand of Justice',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Sur', 'Cham', 'Amn', 'Lo'),
                effects: [
                    effect('chance.level', '100%', { level: 36, skill: 'Blaze' }),
                    effect('chance.die', '100%', { level: 48, skill: 'Meteor' }),
                    effect('skill.aura', 16, { skill: 'Holy Fire' }),
                    effect('stat.attackSpeed', '+33%'),
                    effect('damage.enhanced', '+280-330%', EffectOptions.Varies),
                    'effect.ignoreDefense',
                    effect('resist.enemyFire', '-20%'),
                    effect('on.hit.stealLife', '7%'),
                    effect('chance.deadlyStrike', '20%'),
                    'on.hit.blind',
                    effect('effect.freezeAmount', '+3')
                ]
            },
            Harmony: {
                name: 'Harmony',
                itemTypes: bows,
                ...runes('Tir', 'Ith', 'Sol', 'Ko'),
                effects: [
                    effect('skill.aura', 10, { skill: 'Vigor' }),
                    effect('damage.enhanced', '+200-275%', EffectOptions.Varies),
                    effect('damage.min', '+9'),
                    effect('damage.max', '+9'),
                    effect('damage.fire', '55-160'),
                    effect('damage.lightning', '55-160'),
                    effect('damage.cold', '55-160'),
                    effect('skill.skill', '+2-6', EffectOptions.Varies, { skill: 'Valkyrie' }),
                    effect('stat.dexterity', '+10'),
                    effect('effect.regenerateMana', '20%'),
                    effect('on.kill.mana', '+2'),
                    effect('stat.lightRadius', '+2'),
                    effect('skill.charges', 25, { skill: 'Revive', level: 20 })
                ]
            },
            'Heart of the Oak': {
                name: 'Heart of the Oak',
                itemTypes: ['stave', 'mace'],
                ...runes('Ko', 'Vex', 'Pul', 'Thul'),
                effects: [
                    effect('skill.skill', '+3', { skill: 'All Skills' }),
                    effect('stat.rateCast', '+40%'),
                    effect('damage.demon', '+75%'),
                    effect('stat.attackRatingDemon', '+100'),
                    effect('damage.cold', '3-14'),
                    effect('on.hit.stealMana', '7%'),
                    effect('stat.dexterity', '+10'),
                    effect('effect.replenishLife', '+20'),
                    effect('stat.maxMana', '15%'),
                    effect('resist.all', '+30-40', EffectOptions.Varies),
                    effect('skill.charges', 25, { skill: 'Oak Sage', level: 4 }),
                    effect('skill.charges', 60, { skill: 'Raven', level: 14 })
                ]
            },
            'Holy Thunder': {
                name: 'Holy Thunder',
                itemTypes: 'scepter',
                ...runes('Eth', 'Ral', 'Ort', 'Tal'),
                effects: [
                    effect('damage.enhanced', '+60%'),
                    effect('damage.max', '+10'),
                    effect('effect.targetDefense', '-25%'),
                    effect('damage.fire', '5-30'),
                    effect('damage.lightning', '21-110'),
                    effect('damage.poison', '+75', { duration: 5 }),
                    effect('skill.class', '+3', { skill: 'Holy Shock', class: 'paladin' }),
                    effect('resist.maxLightning', '+5%'),
                    effect('resist.lightning', '+60%'),
                    effect('skill.charges', 60, { skill: 'Chain Lightning', level: 7 })
                ]
            },
            Honor: {
                name: 'Honor',
                itemTypes: 'weaponsMelee',
                ...runes('Amn', 'El', 'Ith', 'Tir', 'Sol'),
                effects: [
                    effect('skill.skill', '+1', { skill: 'All Skills' }),
                    effect('damage.enhanced', '+160%'),
                    effect('damage.min', '+9'),
                    effect('damage.max', '+9'),
                    effect('stat.attackRating', '+250'),
                    effect('on.hit.stealLife', '7%'),
                    effect('chance.deadlyStrike', '25%'),
                    effect('stat.strength', '+10'),
                    effect('effect.replenishLife', '+10'),
                    effect('on.kill.mana', '+2'),
                    effect('stat.lightRadius', '+1')
                ]
            },
            Ice: {
                name: 'Ice',
                itemTypes: bows,
                ...runes('Amn', 'Shael', 'Jah', 'Lo'),
                effects: [
                    effect('chance.level', '100%', { level: 40, skill: 'Blizzard' }),
                    effect('chance.strike', '25%', { level: 22, skill: 'Frost Nova' }),
                    effect('skill.aura', 18, { skill: 'Holy Freeze' }),
                    effect('stat.attackSpeed', '+20%'),
                    effect('damage.enhanced', '+140-210%', EffectOptions.Varies),
                    'effect.ignoreDefense',
                    effect('damage.coldSkill', '+25-30%', EffectOptions.Varies),
                    effect('on.hit.stealLife', '7%'),
                    effect('resist.enemyCold', '-20%'),
                    effect('chance.deadlyStrike', '20%'),
                    effect('effect.GF', '(3.125*Clvl)%', EffectOptions.CharLvl)
                ]
            },
            Infinity: {
                name: 'Infinity',
                itemTypes: 'poleArm',
                ...runes('Ber', 'Mal', 'Ber', 'Ist'),
                effects: [
                    effect('chance.kill', '50%', { level: 20, skill: 'Chain Lightning' }),
                    effect('skill.aura', 12, { skill: 'Conviction' }),
                    effect('stat.runSpeed', '+35%'),
                    effect('damage.enhanced', '+255-325%', EffectOptions.Varies),
                    effect('resist.enemyLightning', '-(45-55)%', EffectOptions.Varies),
                    effect('chance.crushingBlow', '40%'),
                    'effect.preventHeal',
                    effect('stat.vitality', '+(0.5*Clvl)', EffectOptions.CharLvl),
                    effect('effect.MF', '30%'),
                    effect('skill.charges', 30, { skill: 'Cyclone Armor', level: 21 })
                ]
            },
            Insight: {
                name: 'Insight',
                itemTypes: ['poleArm', 'stave'],
                ...runes('Ral', 'Tir', 'Tal', 'Sol'),
                effects: [
                    effect('skill.aura', '12-17', EffectOptions.Varies, { skill: 'Meditation' }),
                    effect('stat.rateCast', '+35%'),
                    effect('damage.enhanced', '+200-260%', EffectOptions.Varies),
                    effect('damage.min', '+9'),
                    effect('stat.attackRatingBonus', '180-250%', EffectOptions.Varies),
                    effect('damage.fire', '5-30'),
                    effect('damage.poison', '+75', { duration: 5 }),
                    effect('skill.skill', '+1-6', EffectOptions.Varies, { skill: 'Critical Strike' }),
                    effect('stat.all', '+5'),
                    effect('on.kill.mana', '+2'),
                    effect('effect.MF', '23%')
                ]
            },
            'King\'s Grace': {
                name: 'King\'s Grace',
                itemTypes: ['sword', 'scepter'],
                ...runes('Amn', 'Ral', 'Thul'),
                effects: [
                    effect('damage.enhanced', '+100%'),
                    effect('stat.attackRating', '+150'),
                    effect('damage.demon', '+100%'),
                    effect('stat.attackRatingDemon', '+100'),
                    effect('damage.undead', '+50%'),
                    effect('stat.attackRatingUndead', '+100'),
                    effect('damage.fire', '5-30'),
                    effect('damage.cold', '3-14'),
                    effect('on.hit.stealLife', '7%')
                ]
            },
            Kingslayer: {
                name: 'Kingslayer',
                itemTypes: ['sword', 'axe'],
                ...runes('Mal', 'Um', 'Gul', 'Fal'),
                effects: [
                    effect('stat.attackSpeed', '+30%'),
                    effect('damage.enhanced', '+230-270%', EffectOptions.Varies),
                    effect('effect.targetDefense', '-25%'),
                    effect('stat.attackRatingBonus', '20%'),
                    effect('chance.crushingBlow', '33%'),
                    effect('chance.openWounds', '50%'),
                    effect('skill.skill', '+1', { skill: 'Vengeance' }),
                    'effect.preventHeal',
                    effect('stat.strength', '+10'),
                    effect('effect.GF', '40%')
                ]
            },
            'Last Wish': {
                name: 'Last Wish',
                itemTypes: ['axe', 'hammer', 'sword'],
                ...runes('Jah', 'Mal', 'Jah', 'Sur', 'Jah', 'Ber'),
                effects: [
                    effect('chance.struck', '6%', { level: 11, skill: 'Fade' }),
                    effect('chance.strike', '10%', { level: 18, skill: 'Life Tap' }),
                    effect('chance.attack', '20%', { level: 20, skill: 'Charged Bolt' }),
                    effect('skill.aura', 17, { skill: 'Might' }),
                    effect('damage.enhanced', '+330-375%', EffectOptions.Varies),
                    'effect.ignoreDefense',
                    effect('chance.crushingBlow', '60-70%', EffectOptions.Varies),
                    'effect.preventHeal',
                    'on.hit.blind',
                    effect('effect.MF', '(0.5*Clvl)%', EffectOptions.CharLvl)
                ]
            },
            Lawbringer: {
                name: 'Lawbringer',
                itemTypes: ['hammer', 'scepter', 'sword'],
                ...runes('Amn', 'Lem', 'Ko'),
                effects: [
                    effect('chance.strike', '20%', { level: 15, skill: 'Decrepify' }),
                    effect('skill.aura', '16-18', EffectOptions.Varies, { skill: 'Sanctuary' }),
                    effect('effect.targetDefense', '-50%'),
                    effect('damage.fire', '150-210'),
                    effect('damage.cold', '130-180'),
                    effect('on.hit.stealLife', '7%'),
                    'effect.rip',
                    effect('effect.defenseMissile', '+200-250', EffectOptions.Varies),
                    effect('stat.dexterity', '+10'),
                    effect('effect.GF', '75%')
                ]
            },
            Leaf: {
                name: 'Leaf',
                itemTypes: 'stave',
                ...runes('Tir', 'Ral'),
                effects: [
                    effect('skill.skill', '+3', { skill: 'Fire Skills' }),
                    effect('damage.fire', '5-30'),
                    effect('skill.class', '+3', { skill: 'Inferno', class: 'sorceress' }),
                    effect('skill.class', '+3', { skill: 'Warmth', class: 'sorceress' }),
                    effect('skill.class', '+3', { skill: 'Fire Bolt', class: 'sorceress' }),
                    effect('stat.defense', '+(2*Clvl)', EffectOptions.CharLvl),
                    effect('resist.cold', '+33%'),
                    effect('on.kill.mana', '+2')
                ]
            },
            Lionheart: {
                name: 'Lionheart',
                itemTypes: 'armorBody',
                ...runes('Hel', 'Lum', 'Fal'),
                effects: [
                    effect('damage.enhanced', '+20%'),
                    effect('stat.strength', '+25'),
                    effect('stat.dexterity', '+15'),
                    effect('stat.vitality', '+20'),
                    effect('stat.energy', '+10'),
                    effect('stat.life', '+50'),
                    effect('resist.all', '+30'),
                    effect('effect.requirements', '-15%')
                ]
            },
            Lore: {
                name: 'Lore',
                itemTypes: all('armorHead'),
                ...runes('Ort', 'Sol'),
                effects: [
                    effect('skill.skill', '+1', { skill: 'All Skills' }),
                    effect('stat.energy', '+10'),
                    effect('resist.lightning', '+30%'),
                    effect('absorb.damage', 7),
                    effect('on.kill.mana', '+2'),
                    effect('stat.lightRadius', '+2')
                ]
            },
            Malice: {
                name: 'Malice',
                itemTypes: all('weaponsMelee'),
                ...runes('Ith', 'El', 'Eth'),
                effects: [
                    effect('damage.enhanced', '+33%'),
                    effect('damage.max', '+9'),
                    effect('effect.targetDefense', '-25%'),
                    effect('stat.attackRating', '+50'),
                    effect('chance.openWounds', '100%'),
                    'effect.preventHeal',
                    effect('on.hit.defenseMonster', -100),
                    effect('effect.drainLife', -5)
                ]
            },
            Melody: {
                name: 'Melody',
                itemTypes: bows,
                ...runes('Shael', 'Ko', 'Nef'),
                effects: [
                    effect('skill.class', '+3', { skill: 'Bow and Crossbow Skills', class: 'amazon' }),
                    effect('stat.attackSpeed', '+20%'),
                    effect('damage.enhanced', '+50%'),
                    effect('damage.undead', '+300%'),
                    effect('skill.class', '+3', { skill: 'Slow Missiles', class: 'amazon' }),
                    effect('skill.class', '+3', { skill: 'Dodge', class: 'amazon' }),
                    effect('skill.class', '+3', { skill: 'Critical Strike', class: 'amazon' }),
                    'effect.knockback',
                    effect('stat.dexterity', '+10')
                ]
            },
            Memory: {
                name: 'Memory',
                itemTypes: 'stave',
                ...runes('Lum', 'Io', 'Sol', 'Eth'),
                effects: [
                    effect('skill.levels', '+3', { class: 'sorceress' }),
                    effect('stat.rateCast', '+33%'),
                    effect('damage.min', '+9'),
                    effect('stat.defense', '-25% Target'),
                    effect('skill.class', '+3', { skill: 'Energy Shield', class: 'sorceress' }),
                    effect('skill.class', '+2', { skill: 'Static Field', class: 'sorceress' }),
                    effect('stat.defenseEnhanced', '+50%'),
                    effect('stat.vitality', '+10'),
                    effect('stat.energy', '+10'),
                    effect('stat.maxMana', '20%'),
                    effect('absorb.damageMagic', 7)
                ]
            },
            Myth: {
                name: 'Myth',
                itemTypes: 'armorBody',
                ...runes('Hel', 'Amn', 'Nef'),
                effects: [
                    effect('chance.struck', '3%', { level: 1, skill: 'Howl' }),
                    effect('chance.strike', '10%', { level: 1, skill: 'Taunt' }),
                    effect('skill.levels', '+3', { class: 'barbarian' }),
                    effect('effect.defenseMissile', '+30'),
                    effect('effect.replenishLife', '+10'),
                    effect('effect.thorns', 14),
                    effect('effect.requirements', '-15%')
                ]
            },
            Nadir: {
                name: 'Nadir',
                itemTypes: all('armorHead'),
                ...runes('Nef', 'Tir'),
                effects: [
                    effect('stat.defenseEnhanced', '+50%'),
                    effect('stat.defense', '+10'),
                    effect('effect.defenseMissile', '+30'),
                    effect('stat.strength', '+5'),
                    effect('on.kill.mana', '+2'),
                    effect('effect.GF', '-33%'),
                    effect('stat.lightRadius', -3),
                    effect('skill.charges', 9, { skill: 'Cloak of Shadows', level: 13 })
                ]
            },
            Oath: {
                name: 'Oath',
                itemTypes: ['axe', 'mace', 'sword'],
                ...runes('Shael', 'Pul', 'Mal', 'Lum'),
                effects: [
                    'effect.indestructible',
                    effect('chance.strike', '30%', { level: 20, skill: 'Bone Spirit' }),
                    effect('stat.attackSpeed', '+50%'),
                    effect('damage.enhanced', '+210-340%', EffectOptions.Varies),
                    effect('damage.demon', '+75%'),
                    effect('stat.attackRatingDemon', '+100'),
                    'effect.preventHeal',
                    effect('stat.energy', '+10'),
                    effect('absorb.magic', '+10-15', EffectOptions.Varies),
                    effect('skill.charges', 20, { skill: 'Heart of Wolverine', level: 16 }),
                    effect('skill.charges', 14, { skill: 'Iron Golem', level: 17 })
                ]
            },
            Obedience: {
                name: 'Obedience',
                itemTypes: 'poleArm',
                ...runes('Hel', 'Ko', 'Thul', 'Eth', 'Fal'),
                effects: [
                    effect('chance.kill', '30%', { level: 21, skill: 'Enchant' }),
                    effect('stat.rateHitRecovery', '+40%'),
                    effect('damage.enhanced', '+370%'),
                    effect('effect.targetDefense', '-25%'),
                    effect('damage.cold', '3-14'),
                    effect('resist.enemyFire', '-25%'),
                    effect('chance.crushingBlow', '40%'),
                    effect('stat.defense', '+200-300', EffectOptions.Varies),
                    effect('stat.strength', '+10'),
                    effect('stat.dexterity', '+10'),
                    effect('resist.all', '+20-30', EffectOptions.Varies),
                    effect('effect.requirements', '-20%')
                ]
            },
            Passion: {
                name: 'Passion',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Dol', 'Ort', 'Eld', 'Lem'),
                effects: [
                    effect('stat.attackSpeed', '+25%'),
                    effect('damage.enhanced', '+160-210%', EffectOptions.Varies),
                    effect('stat.attackRatingBonus', '50-80%', EffectOptions.Varies),
                    effect('damage.undead', '+75%'),
                    effect('stat.attackRatingUndead', '+50'),
                    effect('damage.lightning', '1-50'),
                    effect('skill.skill', '+1', { skill: 'Berserk' }),
                    effect('skill.skill', '+1', { skill: 'Zeal' }),
                    effect('on.hit.blindValue', '+10'),
                    effect('on.hit.fear', '25%'),
                    effect('effect.GF', '75%'),
                    effect('skill.charges', 12, { skill: 'Heart of Wolverine', level: 3 })
                ]
            },
            Peace: {
                name: 'Peace',
                itemTypes: 'armorBody',
                ...runes('Shael', 'Thul', 'Amn'),
                effects: [
                    effect('chance.struck', '4%', { level: 5, skill: 'Slow Missiles' }),
                    effect('chance.strike', '2%', { level: 15, skill: 'Valkyrie' }),
                    effect('skill.levels', '+2', { class: 'amazon' }),
                    effect('stat.rateHitRecovery', '+20%'),
                    effect('skill.skill', '+2', { skill: 'Critical Strike' }),
                    effect('resist.cold', '+30%'),
                    effect('effect.thorns', 14)
                ]
            },
            Phoenix: {
                name: 'Phoenix',
                itemTypes: all('weaponsRanged', 'weaponsMelee', 'shield'),
                ...runes('Vex', 'Vex', 'Lo', 'Jah'),
                effects: [
                    'appliesTo.both',
                    effect('chance.level', '100%', { level: 40, skill: 'Blaze' }),
                    effect('chance.strike', '40%', { level: 22, skill: 'Firestorm' }),
                    effect('skill.aura', '10-15', EffectOptions.Varies, { skill: 'Redemption' }),
                    effect('damage.enhanced', '+350-400%', EffectOptions.Varies),
                    effect('resist.enemyFire', '-28%'),
                    effect('effect.defenseMissile', '+350-400', EffectOptions.Varies),
                    effect('absorb.fire', '+15-21', EffectOptions.Varies),
                    'appliesTo.weapons',
                    'effect.ignoreDefense',
                    effect('on.hit.stealMana', '14%'),
                    effect('chance.deadlyStrike', '20%'),
                    'appliesTo.shields',
                    effect('stat.life', '+50'),
                    effect('resist.maxLightning', '+5%'),
                    effect('resist.maxFire', '+10%')
                ]
            },
            Pride: {
                name: 'Pride',
                itemTypes: 'poleArm',
                ...runes('Cham', 'Sur', 'Io', 'Lo'),
                effects: [
                    effect('chance.struck', '25%', { level: 17, skill: 'Fire Wall' }),
                    effect('skill.aura', '16-20', EffectOptions.Varies, { skill: 'Concentration' }),
                    effect('stat.attackRatingBonus', '260-300%', EffectOptions.Varies),
                    effect('damage.demon', '+(1*Clvl)%', EffectOptions.CharLvl),
                    effect('damage.lightning', '50-280'),
                    effect('chance.deadlyStrike', '20%'),
                    'on.hit.blind',
                    effect('effect.freezeAmount', '+3'),
                    effect('stat.vitality', '+10'),
                    effect('effect.replenishLife', '+8'),
                    effect('effect.GF', '(1.875*Clvl)%', EffectOptions.CharLvl)
                ]
            },
            Principle: {
                name: 'Principle',
                itemTypes: 'armorBody',
                ...runes('Ral', 'Gul', 'Eld'),
                effects: [
                    effect('chance.strike', '100%', { level: 5, skill: 'Holy Bolt' }),
                    effect('skill.levels', '+2', { class: 'paladin' }),
                    effect('damage.undead', '+50%'),
                    effect('stat.life', '+100-150', EffectOptions.Varies),
                    effect('effect.staminaDrain', '15%'),
                    effect('resist.maxPoison', '+5%'),
                    effect('resist.fire', '+30%')
                ]
            },
            Prudence: {
                name: 'Prudence',
                itemTypes: 'armorBody',
                ...runes('Mal', 'Tir'),
                effects: [
                    effect('stat.rateHitRecovery', '+25%'),
                    effect('stat.defenseEnhanced', '+140-170%', EffectOptions.Varies),
                    effect('resist.all', '+25-35', EffectOptions.Varies),
                    effect('absorb.damage', 3),
                    effect('absorb.damageMagic', 17),
                    effect('on.kill.mana', '+2'),
                    effect('stat.lightRadius', '+1'),
                    'effect.repair'
                ]
            },
            Radiance: {
                name: 'Radiance',
                itemTypes: all('armorHead'),
                ...runes('Nef', 'Sol', 'Ith'),
                effects: [
                    effect('stat.defenseEnhanced', '+75%'),
                    effect('effect.defenseMissile', '+30'),
                    effect('stat.vitality', '+10'),
                    effect('stat.energy', '+10'),
                    effect('stat.mana', '+33'),
                    effect('absorb.damage', 7),
                    effect('absorb.damageMagic', 3),
                    effect('effect.damageToMana', '15%'),
                    effect('stat.lightRadius', '+5')
                ]
            },
            Rain: {
                name: 'Rain',
                itemTypes: 'armorBody',
                ...runes('Ort', 'Mal', 'Ith'),
                effects: [
                    effect('chance.struck', '5%', { level: 15, skill: 'Cyclone Armor' }),
                    effect('chance.strike', '5%', { level: 15, skill: 'Twister' }),
                    effect('skill.levels', '+2', { class: 'druid' }),
                    effect('stat.mana', '+100-150', EffectOptions.Varies),
                    effect('resist.lightning', '+30%'),
                    effect('absorb.damageMagic', 7),
                    effect('effect.damageToMana', '15%')
                ]
            },
            Rhyme: {
                name: 'Rhyme',
                itemTypes: all('shield'),
                ...runes('Shael', 'Eth'),
                effects: [
                    effect('stat.rateBlock', '+40%'),
                    effect('stat.block', '20%'),
                    effect('effect.regenerateMana', '15%'),
                    effect('resist.all', '+25'),
                    'absorb.freeze',
                    effect('effect.GF', '50%'),
                    effect('effect.MF', '25%')
                ]
            },
            Rift: {
                name: 'Rift',
                itemTypes: ['poleArm', 'scepter'],
                ...runes('Hel', 'Ko', 'Lem', 'Gul'),
                effects: [
                    effect('chance.strike', '20%', { level: 16, skill: 'Tornado' }),
                    effect('chance.attack', '16%', { level: 21, skill: 'Frozen Orb' }),
                    effect('stat.attackRatingBonus', '20%'),
                    effect('damage.magic', '160-250'),
                    effect('damage.fire', '60-180'),
                    effect('stat.all', '+5-10', EffectOptions.Varies),
                    effect('stat.dexterity', '+10'),
                    effect('effect.damageToMana', '38%'),
                    effect('effect.GF', '75%'),
                    effect('skill.charges', 40, { skill: 'Iron Maiden', level: 15 }),
                    effect('effect.requirements', '-20%')
                ]
            },
            Sanctuary: {
                name: 'Sanctuary',
                itemTypes: 'shield',
                ...runes('Ko', 'Ko', 'Mal'),
                effects: [
                    effect('stat.rateHitRecovery', '+20%'),
                    effect('stat.rateBlock', '+20%'),
                    effect('stat.block', '20%'),
                    effect('stat.defenseEnhanced', '+130-160%', EffectOptions.Varies),
                    effect('effect.defenseMissile', '+250'),
                    effect('stat.dexterity', '+20'),
                    effect('resist.all', '+50-70', EffectOptions.Varies),
                    effect('absorb.damageMagic', 7),
                    effect('skill.charges', 60, { skill: 'Slow Missiles', level: 12 })
                ]
            },
            Silence: {
                name: 'Silence',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Dol', 'Eld', 'Hel', 'Ist', 'Tir', 'Vex'),
                effects: [
                    effect('skill.skill', '+2', { skill: 'All Skills' }),
                    effect('stat.attackSpeed', '+20%'),
                    effect('stat.rateHitRecovery', '+20%'),
                    effect('damage.enhanced', '+200%'),
                    effect('damage.undead', '+75%'),
                    effect('stat.attackRatingUndead', '+50'),
                    effect('on.hit.stealMana', '11%'),
                    effect('on.hit.blindValue', '+33'),
                    effect('on.hit.fear', '25%'),
                    effect('resist.all', '+75'),
                    effect('on.kill.mana', '+2'),
                    effect('effect.MF', '30%'),
                    effect('effect.requirements', '-20%')
                ]
            },
            Smoke: {
                name: 'Smoke',
                itemTypes: 'armorBody',
                ...runes('Nef', 'Lum'),
                effects: [
                    effect('stat.rateHitRecovery', '+20%'),
                    effect('stat.defenseEnhanced', '+75%'),
                    effect('effect.defenseMissile', '+280'),
                    effect('stat.energy', '+10'),
                    effect('resist.all', '+50'),
                    effect('stat.lightRadius', -1),
                    effect('skill.charges', 18, { skill: 'Weaken', level: 6 })
                ]
            },
            Spirit: {
                name: 'Spirit',
                itemTypes: ['sword', 'shield'],
                ...runes('Tal', 'Thul', 'Ort', 'Amn'),
                effects: [
                    'appliesTo.both',
                    effect('skill.skill', '+2', { skill: 'All Skills' }),
                    effect('stat.rateCast', '+25-35%', EffectOptions.Varies),
                    effect('stat.rateHitRecovery', '+55%'),
                    effect('effect.defenseMissile', '+250'),
                    effect('stat.vitality', '+22'),
                    effect('stat.mana', '+89-112', EffectOptions.Varies),
                    effect('absorb.magic', '+3-8', EffectOptions.Varies),
                    'appliesTo.shields',
                    effect('resist.cold', '+35%'),
                    effect('resist.lightning', '+35%'),
                    effect('resist.poison', '+35%'),
                    effect('effect.thorns', 14),
                    'appliesTo.swords',
                    effect('damage.lightning', '1-50'),
                    effect('damage.cold', '3-14'),
                    effect('damage.poison', '+75', { duration: 5 }),
                    effect('on.hit.stealLife', '7%')
                ]
            },
            Splendor: {
                name: 'Splendor',
                itemTypes: 'shield',
                ...runes('Eth', 'Lum'),
                effects: [
                    effect('skill.skill', '+1', { skill: 'All Skills' }),
                    effect('stat.rateCast', '+10%'),
                    effect('stat.rateBlock', '+20%'),
                    effect('stat.defenseEnhanced', '+60-100%', EffectOptions.Varies),
                    effect('stat.energy', '+10'),
                    effect('effect.regenerateMana', '15%'),
                    effect('effect.GF', '50%'),
                    effect('effect.MF', '20%'),
                    effect('stat.lightRadius', '+3')
                ]
            },
            Stealth: {
                name: 'Stealth',
                itemTypes: 'armorBody',
                ...runes('Tal', 'Eth'),
                effects: [
                    effect('stat.runSpeed', '+25%'),
                    effect('stat.rateCast', '+25%'),
                    effect('stat.rateHitRecovery', '+25%'),
                    effect('stat.dexterity', '+6'),
                    effect('effect.regenerateMana', '15%'),
                    effect('stat.maxStamina', '+15'),
                    effect('resist.poison', '+30%'),
                    effect('absorb.damageMagic', 3)
                ]
            },
            Steel: {
                name: 'Steel',
                itemTypes: ['sword', 'axe', 'mace'],
                ...runes('Tir', 'El'),
                effects: [
                    effect('stat.attackSpeed', '+25%'),
                    effect('damage.enhanced', '+20%'),
                    effect('damage.min', '+3'),
                    effect('damage.max', '+3'),
                    effect('stat.attackRating', '+50'),
                    effect('chance.openWounds', '50%'),
                    effect('on.kill.mana', '+2'),
                    effect('stat.lightRadius', '+1')
                ]
            },
            Stone: {
                name: 'Stone',
                itemTypes: 'armorBody',
                ...runes('Shael', 'Um', 'Pul', 'Lum'),
                effects: [
                    effect('stat.rateHitRecovery', '+60%'),
                    effect('stat.defenseEnhanced', '+250-290%', EffectOptions.Varies),
                    effect('effect.defenseMissile', '+300'),
                    effect('stat.strength', '+16'),
                    effect('stat.vitality', '+16'),
                    effect('stat.energy', '+10'),
                    effect('resist.all', '+15'),
                    effect('skill.charges', 80, { skill: 'Molten Boulder', level: 16 }),
                    effect('skill.charges', 16, { skill: 'Clay Golem', level: 16 })
                ]
            },
            Strength: {
                name: 'Strength',
                itemTypes: all('weaponsMelee'),
                ...runes('Amn', 'Tir'),
                effects: [
                    effect('damage.enhanced', '+35%'),
                    effect('on.hit.stealLife', '7%'),
                    effect('chance.crushingBlow', '25%'),
                    effect('stat.strength', '+20'),
                    effect('stat.vitality', '+10'),
                    effect('on.kill.mana', '+2')
                ]
            },
            Treachery: {
                name: 'Treachery',
                itemTypes: 'armorBody',
                ...runes('Shael', 'Thul', 'Lem'),
                effects: [
                    effect('chance.struck', '5%', { level: 15, skill: 'Fade' }),
                    effect('chance.strike', '25%', { level: 15, skill: 'Venom' }),
                    effect('skill.levels', '+2', { class: 'assassin' }),
                    effect('stat.attackSpeed', '+45%'),
                    effect('stat.rateHitRecovery', '+20%'),
                    effect('resist.cold', '+30%'),
                    effect('effect.GF', '50%')
                ]
            },
            Venom: {
                name: 'Venom',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Tal', 'Dol', 'Mal'),
                effects: [
                    'effect.ignoreDefense',
                    effect('damage.poison', '+273', { duration: 6 }),
                    effect('on.hit.stealMana', '7%'),
                    'effect.preventHeal',
                    effect('on.hit.fear', '25%'),
                    effect('skill.charges', 11, { skill: 'Poison Nova', level: 13 }),
                    effect('skill.charges', 27, { skill: 'Poison Explosion', level: 15 })
                ]
            },
            'Voice of Reason': {
                name: 'Voice of Reason',
                itemTypes: ['mace', 'sword'],
                ...runes('Lem', 'Ko', 'El', 'Eld'),
                effects: [
                    effect('chance.strike', '15%', { level: 13, skill: 'Frozen Orb' }),
                    effect('chance.strike', '18%', { level: 20, skill: 'Ice Blast' }),
                    effect('stat.attackRating', '+50'),
                    effect('damage.demon', '+220-350%', EffectOptions.Varies),
                    effect('damage.undead', '+355-375%', EffectOptions.Varies),
                    effect('stat.attackRatingUndead', '+50'),
                    effect('damage.cold', '100-220'),
                    effect('resist.enemyCold', '-24%'),
                    effect('stat.dexterity', '+10'),
                    'absorb.freeze',
                    effect('effect.GF', '75%'),
                    effect('stat.lightRadius', '+1')
                ]
            },
            Wealth: {
                name: 'Wealth',
                itemTypes: 'armorBody',
                ...runes('Lem', 'Ko', 'Tir'),
                effects: [
                    effect('stat.dexterity', '+10'),
                    effect('on.kill.mana', '+2'),
                    effect('effect.GF', '300%'),
                    effect('effect.MF', '100%')
                ]
            },
            White: {
                name: 'White',
                itemTypes: 'wand',
                ...runes('Dol', 'Io'),
                effects: [
                    effect('skill.class', '+3', { skill: 'Poison and Bone Skills', class: 'necromancer' }),
                    effect('stat.rateCast', '+20%'),
                    effect('skill.class', '+3', { skill: 'Bone Spear', class: 'necromancer' }),
                    effect('skill.class', '+3', { skill: 'Skeleton Mastery', class: 'necromancer' }),
                    effect('skill.class', '+3', { skill: 'Bone Armor', class: 'necromancer' }),
                    effect('on.hit.fear', '25%'),
                    effect('stat.vitality', '+10'),
                    effect('stat.mana', '+13'),
                    effect('absorb.damageMagic', 4)
                ]
            },
            Wind: {
                name: 'Wind',
                itemTypes: all('weaponsMelee'),
                ...runes('Sur', 'El'),
                effects: [
                    effect('chance.strike', '10%', { level: 9, skill: 'Tornado' }),
                    effect('stat.runSpeed', '+20%'),
                    effect('stat.attackSpeed', '+40%'),
                    effect('stat.rateHitRecovery', '+15%'),
                    effect('damage.enhanced', '+120-160%', EffectOptions.Varies),
                    effect('effect.targetDefense', '-50%'),
                    effect('stat.attackRating', '+50'),
                    'on.hit.blind',
                    effect('stat.lightRadius', '+1'),
                    effect('skill.charges', 127, { skill: 'Twister', level: 13 })
                ]
            },
            Wrath: {
                name: 'Wrath',
                itemTypes: bows,
                ...runes('Pul', 'Lum', 'Ber', 'Mal'),
                effects: [
                    effect('chance.strike', '30%', { level: 1, skill: 'Decrepify' }),
                    effect('chance.strike', '5%', { level: 10, skill: 'Life Tap' }),
                    effect('damage.demon', '+375%'),
                    effect('stat.attackRatingDemon', '+100'),
                    effect('damage.undead', '+250-300%', EffectOptions.Varies),
                    effect('damage.magic', '85-120'),
                    effect('damage.lightning', '41-240'),
                    effect('chance.crushingBlow', '20%'),
                    'effect.preventHeal',
                    effect('stat.energy', '+10'),
                    'absorb.freeze'
                ]
            },
            Zephyr: {
                name: 'Zephyr',
                itemTypes: bows,
                ...runes('Ort', 'Eth'),
                effects: [
                    effect('chance.struck', '7%', { level: 1, skill: 'Twister' }),
                    effect('stat.runSpeed', '+25%'),
                    effect('stat.attackSpeed', '+25%'),
                    effect('damage.enhanced', '+33%'),
                    effect('effect.targetDefense', '-25%'),
                    effect('stat.attackRating', '+66'),
                    effect('damage.lightning', '1-50'),
                    effect('stat.defense', '+25')
                ]
            }
        };

        ObjectHelper.forEach(
            runeWords,
            (key, runeWord) =>
                runeWord.owned = owned[runeWord.name]);

        return runeWords;
    }
}
