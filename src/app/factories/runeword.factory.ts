// noinspection SpellCheckingInspection

import { Injectable } from '@angular/core';
import { EffectHelper, GemHelper, ObjectHelper, RuneHelper } from '../helpers';
import { IRuneWordMap } from '../interfaces/runeWord';
import { StorageService } from '../services';
import { TItem } from '../types';
import { TRune } from '../types/rune';
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
        // const gems = this.gemHelper.getItems();

        // const { repeat } = ArrayHelper;
        // const rune = this.runeHelper.getItem.bind(this.runeHelper);
        const {
            damageOverTimeEffect: dot,
            integerEffect: int,
            percentageEffect: pct,
            rangeEffect: rng,
            skillAllEffect: skillAll,
            skillAuraEffect: aura,
            skillAuraRangeEffect: auraRange,
            skillChargesEffect: charge,
            skillClassEffect: skillClass,
            skillEffect: skill,
            skillGroupEffect: skillGroup,
            skillRangeEffect: skillRange
        } = EffectHelper;

        const { all, bows } = this;
        const runes = this.runes.bind(this);

        const runeWords: IRuneWordMap = {
            'Ancient\'s Pledge': {
                name: 'Ancient\'s Pledge',
                itemTypes: all('shield'),
                ...runes('Ral', 'Ort', 'Tal'),
                effects: [
                    pct('StatDefense', 50),
                    pct('ResistCold', 43),
                    pct('ResistLightning', 48),
                    pct('ResistFire', 48),
                    pct('ResistPoison', 48),
                    pct('DamageToMana', 10)
                ]
            },
            Beast: {
                name: 'Beast',
                itemTypes: ['axe', 'hammer', 'scepter'],
                ...runes('Ber', 'Tir', 'Um', 'Mal', 'Lum'),
                effects: [
                    aura(9, 'Fanaticism'),
                    `+40% Increased Attack Speed`,
                    pct('DamageEnhancedRange', 240, 270),
                    pct('ChanceCrushingBlow', 20),
                    pct('ChanceOpenWounds', 25),
                    skill(3, 'Werebear'),
                    skill(3, 'Lycanthropy'),
                    int('PreventMonsterHealing'),
                    '+25-40 to Strength (varies)',
                    int('StatEnergy', 10),
                    int('OnKillMana', 2),
                    charge(13, 'Summon Grizzly', 5)
                ]
            },
            Black: {
                name: 'Black',
                itemTypes: ['club', 'mace', 'hammer'],
                ...runes('Thul', 'Io', 'Nef'),
                effects: [
                    `+15% Increased Attack Speed`,
                    pct('DamageEnhanced', 120),
                    int('AttackRating', 200),
                    rng('DamageColdDuration', 3, 14, 3),
                    pct('ChanceCrushingBlow', 40),
                    int('KnockBack'),
                    int('StatVitality', 10),
                    int('ReduceDamageMagic', 2),
                    charge(4, 'Corpse Explosion', 12)
                ]
            },
            Bone: {
                name: 'Bone',
                itemTypes: 'armorBody',
                ...runes('Sol', 'Um', 'Um'),
                effects: [
                    `15% Chance To Cast level 10 Bone Armor When Struck
15% Chance To Cast level 10 Bone Spear On Striking`,
                    skillAll(2, 'necromancer'),
                    `+100-150 To Mana (varies)`,
                    int('ResistAll', 30),
                    `Damage Reduced By 7`
                ]
            },
            Bramble: {
                name: 'Bramble',
                itemTypes: 'armorBody',
                ...runes('Ral', 'Ohm', 'Sur', 'Eth'),
                effects: [
                    auraRange(15, 21, 'Thorns'),
                    `+50% Faster Hit Recovery
+25-50% To Poison Skill Damage (varies)`,
                    int('StatDefense', 300),
                    `Increase Maximum Mana 5%`,
                    pct('StatRegenMana', 15),
                    `+5% To Maximum Cold Resist`,
                    pct('ResistFire', 30),
                    pct('ResistPoison', 100),
                    int('OnKillLife', 13),
                    charge(13, 'Spirit of Barbs', 33)
                ]
            },
            Brand: {
                name: 'Brand',
                itemTypes: bows,
                ...runes('Jah', 'Lo', 'Mal', 'Gul'),
                effects: [
                    `35% Chance To Cast Level 14 Amplify Damage When Struck
100% Chance To Cast Level 18 Bone Spear On Striking
Fires Explosive Arrows or Bolts (15)`,
                    pct('DamageEnhancedRange', 260, 340),
                    int('Piercing'),
                    `20% Bonus to Attack Rating
+280-330% Damage To Demons (varies)
20% Deadly Strike`,
                    int('PreventMonsterHealing'),
                    int('KnockBack')
                ]
            },
            'Breath of the Dying': {
                name: 'Breath of the Dying',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Vex', 'Hel', 'El', 'Eld', 'Zod', 'Eth'),
                effects: [
                    `50% Chance To Cast Level 20 Poison Nova When You Kill An Enemy`,
                    int('Indestructible'),
                    `+60% Increased Attack Speed`,
                    pct('DamageEnhancedRange', 350, 400),
                    pct('DefenseTarget', -25),
                    int('AttackRating', 50),
                    pct('DamageUndead', 200),
                    int('ARUndead', 50),
                    pct('LeechMana', 7),
                    `12-15% Life Stolen Per Hit (varies)`,
                    int('PreventMonsterHealing'),
                    `+30 To All Attributes`,
                    int('StatLightRadius', 1),
                    `Requirements -20%`
                ]
            },
            'Call to Arms': {
                name: 'Call to Arms',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Amn', 'Ral', 'Mal', 'Ist', 'Ohm'),
                effects: [
                    skillAll(1),
                    `+40% Increased Attack Speed`,
                    pct('DamageEnhancedRange', 240, 290),
                    rng('DamageFire', 5, 30),
                    pct('LeechLife', 7),
                    skillRange(2, 6, 'Battle Command'),
                    skillRange(1, 6, 'Battle Orders'),
                    skillRange(1, 4, 'Battle Cry'),
                    int('PreventMonsterHealing'),
                    `Replenish Life +12`,
                    pct('MagicFind', 30)
                ]
            },
            'Chains of Honor': {
                name: 'Chains of Honor',
                itemTypes: 'armorBody',
                ...runes('Dol', 'Um', 'Ber', 'Ist'),
                effects: [
                    skillAll(2),
                    pct('DamageDemons', 200),
                    pct('DamageUndead', 100),
                    pct('LeechLife', 8),
                    `+70% Enhanced Defense`,
                    int('StatStrength', 20),
                    `Replenish Life +7`,
                    int('ResistAll', 65),
                    pct('ReduceDamage', 8),
                    pct('MagicFind', 25)
                ]
            },
            Chaos: {
                name: 'Chaos',
                itemTypes: 'claw',
                ...runes('Fal', 'Ohm', 'Um'),
                effects: [
                    `9% Chance To Cast Level 11 Frozen Orb On Striking
11% Chance To Cast Level 9 Charged Bolt On Striking
+35% Increased Attacked Speed`,
                    pct('DamageEnhancedRange', 240, 290),
                    rng('DamageMagic', 216, 471),
                    pct('ChanceOpenWounds', 25),
                    `+1 To Whirlwind`,
                    int('StatStrength', 10),
                    `+15 Life After Each Demon Kill`
                ]
            },
            'Crescent Moon': {
                name: 'Crescent Moon',
                itemTypes: ['axe', 'poleArm', 'sword'],
                ...runes('Shael', 'Um', 'Tir'),
                effects: [
                    `10% Chance To Cast Level 17 Chain Lightning On Striking
7% Chance To Cast Level 13 Static Field On Striking
+20% Increased Attack Speed`,
                    pct('DamageEnhancedRange', 180, 220),
                    int('Piercing'),
                    `-35% To Enemy Lightning Resistance`,
                    pct('ChanceOpenWounds', 25),
                    `+9-11 Magic Absorb (varies)`,
                    int('OnKillMana', 2),
                    charge(18, 'Summon Spirit Wolf', 30)
                ]
            },
            Death: {
                name: 'Death',
                itemTypes: ['sword', 'axe'],
                ...runes('Hel', 'El', 'Vex', 'Ort', 'Gul'),
                effects: [
                    int('Indestructible'),
                    `100% Chance To Cast Level 44 Chain Lightning When You Die
25% Chance To Cast Level 18 Glacial Spike On Attack`,
                    pct('DamageEnhancedRange', 300, 385),
                    `20% Bonus To Attack Rating`,
                    int('AttackRating', 50),
                    rng('DamageLightning', 1, 50),
                    pct('LeechMana', 7),
                    pct('ChanceCrushingBlow', 50),
                    `(0.5*Clvl)% Deadly Strike (Based on Character Level)`,
                    int('StatLightRadius', 1),
                    charge(22, 'Blood Golem', 15),
                    `Requirements -20%`
                ]
            },
            Delirium: {
                name: 'Delirium',
                itemTypes: all('armorHead'),
                ...runes('Lem', 'Ist', 'Io'),
                effects: [
                    `1% Chance To Cast lvl 50 Delirium When Struck
6% Chance To Cast lvl 14 Mind Blast When Struck
14% Chance To Cast lvl 13 Terror When Struck
11% Chance To Cast lvl 18 Confuse On Striking`,
                    skillAll(2),
                    int('StatDefense', 261),
                    int('StatVitality', 10),
                    pct('ExtraGold', 50),
                    pct('MagicFind', 25),
                    charge(17, 'Attract', 60)
                ]
            },
            Destruction: {
                name: 'Destruction',
                itemTypes: ['poleArm', 'sword'],
                ...runes('Vex', 'Lo', 'Ber', 'Jah', 'Ko'),
                effects: [
                    `23% Chance To Cast Level 12 Volcano On Striking
5% Chance To Cast Level 23 Molten Boulder On Striking
100% Chance To Cast level 45 Meteor When You Die
15% Chance To Cast Level 22 Nova On Attack`,
                    pct('DamageEnhanced', 350),
                    int('Piercing'),
                    rng('DamageMagic', 100, 180),
                    pct('LeechMana', 7),
                    pct('ChanceCrushingBlow', 20),
                    `20% Deadly Strike`,
                    int('PreventMonsterHealing'),
                    int('StatDexterity', 10)
                ]
            },
            Doom: {
                name: 'Doom',
                itemTypes: ['axe', 'hammer', 'poleArm'],
                ...runes('Hel', 'Ohm', 'Um', 'Lo', 'Cham'),
                effects: [
                    `5% Chance To Cast Level 18 Volcano On Striking`,
                    aura(12, 'Holy Freeze'),
                    skillAll(2),
                    `+45% Increased Attack Speed`,
                    pct('DamageEnhancedRange', 330, 370),
                    `-40-60% To Enemy Cold Resistance (varies)
20% Deadly Strike`,
                    pct('ChanceOpenWounds', 25),
                    int('PreventMonsterHealing'),
                    `Freezes Target +3
Requirements -20%`
                ]
            },
            Dragon: {
                name: 'Dragon',
                itemTypes: all('armorBody', 'shield'),
                ...runes('Sur', 'Lo', 'Sol'),
                effects: [
                    `20% Chance to Cast Level 18 Venom When Struck
12% Chance To Cast Level 15 Hydra On Striking`,
                    aura(14, 'Holy Fire'),
                    int('StatDefense', 360),
                    int('StatDefenseMissile', 230),
                    `+3-5 To All Attributes (varies)
+(0.375*Clvl) To Strength (Based on Character Level)
+5% To Maximum Lightning Resist`,
                    int('ReduceDamage', 7),
                    `Armor
Increase Maximum Mana 5%
Shields`,
                    int('StatMana', 50)
                ]
            },
            Dream: {
                name: 'Dream',
                itemTypes: all('shield', 'armorHead'),
                ...runes('Io', 'Jah', 'Pul'),
                effects: [
                    `10% Chance To Cast Level 15 Confuse When Struck`,
                    aura(15, 'Holy Shock'),
                    `+20-30% Faster Hit Recovery (varies)
+30% Enhanced Defense
+150-220 Defense (varies)`,
                    int('StatVitality', 10),
                    `+(0.625*Clvl) To Mana (Based On Character Level)
All Resistances +5-20 (varies)
12-25% Better Chance of Getting Magic Items (varies)
Headgear
Increase Maximum Life 5%
Shields`,
                    int('StatLife', 50)
                ]
            },
            Duress: {
                name: 'Duress',
                itemTypes: 'armorBody',
                ...runes('Shael', 'Um', 'Thul'),
                effects: [
                    `40% faster hit Recovery`,
                    pct('DamageEnhancedRange', 10, 20),
                    rng('DamageCold', 37, 133),
                    `15% Crushing Blow
33% Open Wounds
+150-200% Enhanced Defense (varies)
-20% Slower Stamina Drain`,
                    pct('ResistCold', 45),
                    pct('ResistLightning', 15),
                    pct('ResistFire', 15),
                    pct('ResistPoison', 15)
                ]
            },
            Edge: {
                name: 'Edge',
                itemTypes: bows,
                ...runes('Tir', 'Tal', 'Amn'),
                effects: [
                    aura(15, 'Thorns'),
                    `+35% Increased Attack Speed
+320-380% Damage To Demons (varies)`,
                    pct('DamageUndead', 280),
                    dot('DamagePoison', 75, 5),
                    pct('LeechLife', 7),
                    int('PreventMonsterHealing'),
                    `+5-10 To All Attributes (varies)`,
                    int('OnKillMana', 2),
                    `Reduces All Vendor Prices 15%`
                ]
            },
            Enigma: {
                name: 'Enigma',
                itemTypes: 'armorBody',
                ...runes('Jah', 'Ith', 'Ber'),
                effects: [
                    skillAll(2),
                    `+45% Faster Run/Walk`,
                    skill(1, 'Teleport'),
                    `+750-775 Defense (Varies)
+(0.75*Clvl) To Strength (Based On Character Level)
Increase Maximum Life 5%`,
                    pct('ReduceDamage', 8),
                    int('OnKillLife', 14),
                    `15% Damage Taken Goes To Mana
(1*Clvl)% Better Chance of Getting Magic Items (Based On Character Level)`
                ]
            },
            Enlightenment: {
                name: 'Enlightenment',
                itemTypes: 'armorBody',
                ...runes('Pul', 'Ral', 'Sol'),
                effects: [
                    `5% Chance To Cast Level 15 Blaze When Struck
5% Chance To Cast level 15 Fire Ball On Striking`,
                    skillAll(2, 'sorceress'),
                    skill(1, 'Warmth'),
                    `+30% Enhanced Defense`,
                    pct('ResistFire', 30),
                    int('ReduceDamage', 7)
                ]
            },
            Eternity: {
                name: 'Eternity',
                itemTypes: all('weaponsMelee'),
                ...runes('Amn', 'Ber', 'Ist', 'Sol', 'Sur'),
                effects: [
                    int('Indestructible'),
                    pct('DamageEnhancedRange', 260, 310),
                    int('DamageMinimum', 9),
                    pct('LeechLife', 7),
                    pct('ChanceCrushingBlow', 20),
                    `Hit Blinds Target`,
                    int('Blind'),
                    `Slows Target By 33%
Replenish Mana 16%`,
                    int('CannotBeFrozen'),
                    pct('MagicFind', 30),
                    charge(8, 'Revive', 88)
                ]
            },
            Exile: {
                name: 'Exile',
                itemTypes: 'paladinShield',
                ...runes('Vex', 'Ohm', 'Ist', 'Dol'),
                effects: [
                    `15% Chance To Cast Level 5 Life Tap On Striking`,
                    auraRange(13, 16, 'Defiance'),
                    skillGroup(2, 'Offensive Auras', 'paladin'),
                    `+30% Faster Block Rate
Freezes Target
+220-260% Enhanced Defense (varies)
Replenish Life +7
+5% To Maximum Cold Resist
+5% To Maximum Fire Resist`,
                    pct('MagicFind', 25),
                    `Repairs 1 Durability every 4 seconds`
                ]
            },
            Faith: {
                name: 'Faith',
                itemTypes: bows,
                ...runes('Ohm', 'Jah', 'Lem', 'Eld'),
                effects: [
                    auraRange(12, 15, 'Fanaticism'),
                    `+1-2 To All Skills (varies)`,
                    pct('DamageEnhanced', 330),
                    int('Piercing'),
                    `300% Bonus To Attack Rating`,
                    pct('DamageUndead', 75),
                    int('ARUndead', 50),
                    `+120 Fire Damage`,
                    int('ResistAll', 15),
                    `10% Reanimate As: Returned`,
                    pct('ExtraGold', 75)
                ]
            },
            Famine: {
                name: 'Famine',
                itemTypes: ['axe', 'hammer'],
                ...runes('Fal', 'Ohm', 'Ort', 'Jah'),
                effects: [
                    `+30% Increased Attack Speed`,
                    pct('DamageEnhancedRange', 320, 370),
                    int('Piercing'),
                    rng('DamageMagic', 180, 200), rng('DamageFire', 50, 200), rng('DamageLightning', 51, 250),
                    rng('DamageCold', 50, 200),
                    pct('LeechLife', 12),
                    int('PreventMonsterHealing'),
                    int('StatStrength', 10)
                ]
            },
            Fortitude: {
                name: 'Fortitude',
                itemTypes: all('weaponsRanged', 'weaponsMelee', 'armorBody'),
                ...runes('El', 'Sol', 'Dol', 'Lo'),
                effects: [
                    `20% Chance To Cast Level 15 Chilling Armor when Struck
+25% Faster Cast Rate`,
                    pct('DamageEnhanced', 300),
                    `
+200% Enhanced Defense
+((8-12)*0.125*Clvl) To Life (Based on Character Level) (varies)
All Resistances +25-30 (varies)
12% Damage Taken Goes To Mana`,
                    int('StatLightRadius', 1),
                    `Weapons`,
                    int('DamageMinimum', 9),
                    int('AttackRating', 50),
                    `20% Deadly Strike
Hit Causes Monster To Flee 25%
Armor`,
                    int('StatDefense', 15),
                    `Replenish Life +7
+5% To Maximum Lightning Resist`,
                    int('ReduceDamage', 7)
                ]
            },
            Fury: {
                name: 'Fury',
                itemTypes: all('weaponsMelee'),
                ...runes('Jah', 'Gul', 'Eth'),
                effects: [
                    `40% Increased Attack Speed`,
                    pct('DamageEnhanced', 209),
                    int('Piercing'),
                    pct('DefenseTarget', -25),
                    `20% Bonus to Attack Rating`,
                    pct('LeechLife', 6),
                    `33% Chance Of Deadly Strike`,
                    pct('ChanceOpenWounds', 66),
                    skillClass(5, 'Frenzy', 'barbarian'),
                    int('PreventMonsterHealing')
                ]
            },
            Gloom: {
                name: 'Gloom',
                itemTypes: 'armorBody',
                ...runes('Fal', 'Um', 'Pul'),
                effects: [
                    `15% Chance To Cast Level 3 Dim Vision When Struck
+10% Faster Hit Recovery
+200-260% Enhanced Defense (varies)`,
                    int('StatStrength', 10),
                    int('ResistAll', 45),
                    `Half Freeze Duration
5% Damage Taken Goes To Mana
-3 To Light Radius`
                ]
            },
            Grief: {
                name: 'Grief',
                itemTypes: ['sword', 'axe'],
                ...runes('Eth', 'Tir', 'Lo', 'Mal', 'Ral'),
                effects: [
                    `35% Chance To Cast Level 15 Venom On Striking
+30-40% Increased Attack Speed (varies)
Damage +340-400 (varies)`,
                    int('Piercing'),
                    pct('DefenseTarget', -25),
                    `+(1.875*Clvl)% Damage To Demons (Based on Character Level)`,
                    rng('DamageFire', 5, 30),
                    `-20-25% To Enemy Poison Resistance (varies)
20% Deadly Strike`,
                    int('PreventMonsterHealing'),
                    int('OnKillMana', 2),
                    `+10-15 Life After Each Kill (varies)`
                ]
            },
            'Hand of Justice': {
                name: 'Hand of Justice',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Sur', 'Cham', 'Amn', 'Lo'),
                effects: [
                    `100% Chance To Cast Level 36 Blaze When You Level-Up
100% Chance To Cast Level 48 Meteor When You Die`,
                    aura(16, 'Holy Fire'),
                    `
+33% Increased Attack Speed`,
                    pct('DamageEnhancedRange', 280, 330),
                    int('Piercing'),
                    `-20% To Enemy Fire Resistance`,
                    pct('LeechLife', 7),
                    `20% Deadly Strike
Hit Blinds Target
Freezes Target +3`
                ]
            },
            Harmony: {
                name: 'Harmony',
                itemTypes: bows,
                ...runes('Tir', 'Ith', 'Sol', 'Ko'),
                effects: [
                    aura(10, 'Vigor'),
                    ``,
                    pct('DamageEnhancedRange', 200, 275),
                    int('DamageMinimum', 9),
                    int('DamageMaximum', 9), rng('DamageFire', 55, 160), rng('DamageLightning', 55, 160),
                    rng('DamageCold', 55, 160),
                    `+2-6 To Valkyrie (varies)`,
                    int('StatDexterity', 10),
                    pct('StatRegenMana', 20),
                    int('OnKillMana', 2),
                    int('StatLightRadius', 2),
                    charge(20, 'Revive', 25)
                ]
            },
            'Heart of the Oak': {
                name: 'Heart of the Oak',
                itemTypes: ['stave', 'mace'],
                ...runes('Ko', 'Vex', 'Pul', 'Thul'),
                effects: [
                    skillAll(3),
                    `
+40% Faster Cast Rate`,
                    pct('DamageDemons', 75),
                    int('ARDemons', 100),
                    rng('DamageCold', 3, 14),
                    pct('LeechMana', 7),
                    int('StatDexterity', 10),
                    `Replenish Life +20
Increase Maximum Mana 15%
All Resistances +30-40 (varies)`,
                    charge(4, 'Oak Sage', 25),
                    charge(14, 'Raven', 60)
                ]
            },
            'Holy Thunder': {
                name: 'Holy Thunder',
                itemTypes: 'scepter',
                ...runes('Eth', 'Ral', 'Ort', 'Tal'),
                effects: [
                    pct('DamageEnhanced', 60),
                    int('DamageMaximum', 10),
                    pct('DefenseTarget', -25),
                    rng('DamageFire', 5, 30),
                    rng('DamageLightning', 21, 110),
                    dot('DamagePoison', 75, 5),
                    skillClass(3, 'Holy Shock', 'paladin'),
                    `+5% to Maximum Lightning Resist`,
                    pct('ResistLightning', 60),
                    charge(7, 'Chain Lightning', 60)
                ]
            },
            Honor: {
                name: 'Honor',
                itemTypes: 'weaponsMelee',
                ...runes('Amn', 'El', 'Ith', 'Tir', 'Sol'),
                effects: [
                    skillAll(1),
                    pct('DamageEnhanced', 160),
                    int('DamageMinimum', 9),
                    int('DamageMaximum', 9),
                    `+250 Attack Rating`,
                    pct('LeechLife', 7),
                    `25% Deadly Strike`,
                    int('StatStrength', 10),
                    `Replenish life +10`,
                    int('StatMana', 2),
                    int('StatLightRadius', 1)
                ]
            },
            Ice: {
                name: 'Ice',
                itemTypes: bows,
                ...runes('Amn', 'Shael', 'Jah', 'Lo'),
                effects: [
                    `100% Chance To Cast Level 40 Blizzard When You Level-up
25% Chance To Cast Level 22 Frost Nova On Striking`,
                    aura(18, 'Holy Freeze'),
                    `+20% Increased Attack Speed`,
                    pct('DamageEnhancedRange', 140, 210),
                    int('Piercing'),
                    `+25-30% To Cold Skill Damage (varies)`,
                    pct('LeechLife', 7),
                    `-20% To Enemy Cold Resistance
20% Deadly Strike
(3.125*Clvl)% Extra Gold From Monsters (Based on Character Level)`
                ]
            },
            Infinity: {
                name: 'Infinity',
                itemTypes: 'poleArm',
                ...runes('Ber', 'Mal', 'Ber', 'Ist'),
                effects: [
                    `50% Chance To Cast Level 20 Chain Lightning When You Kill An Enemy`,
                    aura(12, 'Conviction'),
                    `+35% Faster Run/Walk`,
                    pct('DamageEnhancedRange', 255, 325),
                    `-(45-55)% To Enemy Lightning Resistance (varies)`,
                    pct('ChanceCrushingBlow', 40),
                    int('PreventMonsterHealing'),
                    `+(0.5*Clvl) To Vitality (Based on Character Level)`,
                    pct('MagicFind', 30),
                    charge(21, 'Cyclone Armor', 30)
                ]
            },
            Insight: {
                name: 'Insight',
                itemTypes: ['poleArm', 'stave'],
                ...runes('Ral', 'Tir', 'Tal', 'Sol'),
                effects: [
                    auraRange(12, 17, 'Meditation'),
                    `+35% Faster Cast Rate`,
                    pct('DamageEnhancedRange', 200, 260),
                    int('DamageMinimum', 9),
                    `180-250% Bonus to Attack Rating (varies)`,
                    rng('DamageFire', 5, 30),
                    dot('DamagePoison', 75, 5),
                    `+1-6 To Critical Strike (varies)
+5 To All Attributes`,
                    int('OnKillMana', 2),
                    pct('MagicFind', 23)
                ]
            },
            'King\'s Grace': {
                name: 'King\'s Grace',
                itemTypes: ['sword', 'scepter'],
                ...runes('Amn', 'Ral', 'Thul'),
                effects: [
                    pct('DamageEnhanced', 100),
                    int('AttackRating', 150),
                    pct('DamageDemons', 100),
                    int('ARDemons', 100),
                    pct('DamageUndead', 50),
                    int('ARUndead', 100),
                    rng('DamageFire', 5, 30), rng('DamageCold', 3, 14),
                    pct('LeechLife', 7)
                ]
            },
            Kingslayer: {
                name: 'Kingslayer',
                itemTypes: ['sword', 'axe'],
                ...runes('Mal', 'Um', 'Gul', 'Fal'),
                effects: [
                    `+30% Increased Attack Speed`,
                    pct('DamageEnhancedRange', 230, 270),
                    pct('DefenseTarget', -25),
                    `20% Bonus To Attack Rating`,
                    pct('ChanceCrushingBlow', 33),
                    pct('ChanceOpenWounds', 50),
                    skill(1, 'Vengeance'),
                    int('PreventMonsterHealing'),
                    int('StatStrength', 10),
                    pct('ExtraGold', 40)
                ]
            },
            'Last Wish': {
                name: 'Last Wish',
                itemTypes: ['axe', 'hammer', 'sword'],
                ...runes('Jah', 'Mal', 'Jah', 'Sur', 'Jah', 'Ber'),
                effects: [
                    `6% Chance To Cast Level 11 Fade When Struck
10% Chance To Cast Level 18 Life Tap On Striking
20% Chance To Cast Level 20 Charged Bolt On Attack`,
                    aura(17, 'Might'),
                    pct('DamageEnhancedRange', 330, 375),
                    int('Piercing'),
                    `60-70% Chance of Crushing Blow (varies)`,
                    int('PreventMonsterHealing'),
                    `Hit Blinds Target
(0.5*Clvl)% Chance of Getting Magic Items (Based on Character Level)`
                ]
            },
            Lawbringer: {
                name: 'Lawbringer',
                itemTypes: ['hammer', 'scepter', 'sword'],
                ...runes('Amn', 'Lem', 'Ko'),
                effects: [
                    `20% Chance To Cast Level 15 Decrepify On Striking`,
                    auraRange(16, 18, 'Sanctuary'),
                    pct('DefenseTarget', -50),
                    rng('DamageFire', 150, 210),
                    rng('DamageCold', 130, 180),
                    pct('LeechLife', 7),
                    `Slain Monsters Rest In Peace
+200-250 Defense Vs. Missile (varies)`,
                    int('StatDexterity', 10),
                    pct('ExtraGold', 75)
                ]
            },
            Leaf: {
                name: 'Leaf',
                itemTypes: 'stave',
                ...runes('Tir', 'Ral'),
                effects: [
                    skillGroup(3, 'Fire Skills'),
                    rng('DamageFire', 5, 30),
                    skillClass(3, 'Inferno', 'sorceress'),
                    skillClass(3, 'Warmth', 'sorceress'),
                    skillClass(3, 'Fire Bolt', 'sorceress'),
                    `+(2*Clvl) Defence (Based on Character Level)`,
                    pct('ResistCold', 33),
                    int('OnKillMana', 2)
                ]
            },
            Lionheart: {
                name: 'Lionheart',
                itemTypes: 'armorBody',
                ...runes('Hel', 'Lum', 'Fal'),
                effects: [
                    pct('DamageEnhanced', 20),
                    int('StatStrength', 25),
                    int('StatDexterity', 15),
                    int('StatVitality', 20),
                    int('StatEnergy', 10),
                    int('StatLife', 50),
                    int('ResistAll', 30),
                    `Requirements -15%`
                ]
            },
            Lore: {
                name: 'Lore',
                itemTypes: all('armorHead'),
                ...runes('Ort', 'Sol'),
                effects: [
                    skillAll(1),
                    int('StatEnergy', 10),
                    pct('ResistLightning', 30),
                    int('ReduceDamage', 7),
                    int('OnKillMana', 2),
                    int('StatLightRadius', 2)
                ]
            },
            Malice: {
                name: 'Malice',
                itemTypes: all('weaponsMelee'),
                ...runes('Ith', 'El', 'Eth'),
                effects: [
                    pct('DamageEnhanced', 33),
                    int('DamageMaximum', 9),
                    pct('DefenseTarget', -25),
                    int('AttackRating', 50),
                    pct('ChanceOpenWounds', 100),
                    int('PreventMonsterHealing'),
                    `-100 to Monster Defense Per Hit
Drain Life -5`
                ]
            },
            Melody: {
                name: 'Melody',
                itemTypes: bows,
                ...runes('Shael', 'Ko', 'Nef'),
                effects: [
                    skillGroup(3, 'Bow and Crossbow Skills', 'amazon'),
                    `+20% Increased Attack Speed`,
                    pct('DamageEnhanced', 50),
                    pct('DamageUndead', 300),
                    skillClass(3, 'Slow Missiles', 'amazon'),
                    skillClass(3, 'Dodge', 'amazon'),
                    skillClass(3, 'Critical Strike', 'amazon'),
                    int('KnockBack'),
                    int('StatDexterity', 10)
                ]
            },
            Memory: {
                name: 'Memory',
                itemTypes: 'stave',
                ...runes('Lum', 'Io', 'Sol', 'Eth'),
                effects: [
                    skillAll(3, 'sorceress'),
                    `+33% Faster Cast Rate`,
                    int('DamageMinimum', 9),
                    `-25% Target Defence`,
                    skillClass(3, 'Energy Shield', 'sorceress'),
                    skillClass(2, 'Static Field', 'sorceress'),
                    `+50% Enhanced Defense`,
                    int('StatVitality', 10),
                    int('StatEnergy', 10),
                    `Increase Maximum Mana 20%`,
                    int('ReduceDamageMagic', 7)
                ]
            },
            Myth: {
                name: 'Myth',
                itemTypes: 'armorBody',
                ...runes('Hel', 'Amn', 'Nef'),
                effects: [
                    `3% Chance To Cast Level 1 Howl When Struck
10% Chance To Cast Level 1 Taunt On Striking`,
                    skillAll(2, 'barbarian'),
                    int('StatDefenseMissile', 30),
                    `Replenish Life +10
Attacker Takes Damage of 14
Requirements -15%`
                ]
            },
            Nadir: {
                name: 'Nadir',
                itemTypes: all('armorHead'),
                ...runes('Nef', 'Tir'),
                effects: [
                    `+50% Enhanced Defense`,
                    int('StatDefense', 10),
                    int('StatDefenseMissile', 30),
                    int('StatStrength', 5),
                    int('OnKillMana', 2),
                    pct('ExtraGold', -33),
                    `-3 to Light Radius`,
                    charge(13, 'Cloak of Shadows', 9)
                ]
            },
            Oath: {
                name: 'Oath',
                itemTypes: ['axe', 'mace', 'sword'],
                ...runes('Shael', 'Pul', 'Mal', 'Lum'),
                effects: [
                    int('Indestructible'),
                    `30% Chance To Cast Level 20 Bone Spirit On Striking
+50% Increased Attack Speed`,
                    pct('DamageEnhancedRange', 210, 340),
                    pct('DamageDemons', 75),
                    int('ARDemons', 100),
                    int('PreventMonsterHealing'),
                    int('StatEnergy', 10),
                    `+10-15 Magic Absorb (varies)`,
                    charge(16, 'Heart of Wolverine', 20),
                    charge(17, 'Iron Golem', 14)
                ]
            },
            Obedience: {
                name: 'Obedience',
                itemTypes: 'poleArm',
                ...runes('Hel', 'Ko', 'Thul', 'Eth', 'Fal'),
                effects: [
                    `30% Chance To Cast Level 21 Enchant When You Kill An Enemy
+40% Faster Hit Recovery`,
                    pct('DamageEnhanced', 370),
                    pct('DefenseTarget', -25),
                    rng('DamageColdDuration', 3, 14, 3),
                    `-25% To Enemy Fire Resistance`,
                    pct('ChanceCrushingBlow', 40),
                    `+200-300 Defense (varies)`,
                    int('StatStrength', 10),
                    int('StatDexterity', 10),
                    `All Resistances +20-30 (varies)
Requirements -20%`
                ]
            },
            Passion: {
                name: 'Passion',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Dol', 'Ort', 'Eld', 'Lem'),
                effects: [
                    `+25% Increased Attack Speed`,
                    pct('DamageEnhancedRange', 160, 210),
                    `50-80% Bonus To Attack Rating (varies)`,
                    pct('DamageUndead', 75),
                    int('ARUndead', 50),
                    rng('DamageLightning', 1, 50),
                    skill(1, 'Berserk'),
                    skill(1, 'Zeal'),
                    `Hit Blinds Target +10
Hit Causes Monster To Flee 25%`,
                    pct('ExtraGold', 75),
                    charge(3, 'Heart of Wolverine', 12)
                ]
            },
            Peace: {
                name: 'Peace',
                itemTypes: 'armorBody',
                ...runes('Shael', 'Thul', 'Amn'),
                effects: [
                    `4% Chance To Cast Level 5 Slow Missiles When Struck
2% Chance To Cast level 15 Valkyrie On Striking`,
                    skillAll(2, 'amazon'),
                    `+20% Faster Hit Recovery`,
                    skill(2, 'Critical Strike'),
                    pct('ResistCold', 30),
                    `Attacker Takes Damage of 14`
                ]
            },
            Phoenix: {
                name: 'Phoenix',
                itemTypes: all('weaponsRanged', 'weaponsMelee', 'shield'),
                ...runes('Vex', 'Vex', 'Lo', 'Jah'),
                effects: [
                    `100% Chance To Cast level 40 Blaze When You Level-up
40% Chance To Cast Level 22 Firestorm On Striking`,
                    auraRange(10, 15, 'Redemption'),
                    pct('DamageEnhancedRange', 350, 400),
                    `-28% To Enemy Fire Resistance
+350-400 Defense Vs. Missile (varies)
+15-21 Fire Absorb (varies)
Weapons`,
                    int('Piercing'),
                    pct('LeechMana', 14),
                    `20% Deadly Strike
Shields`,
                    int('StatLife', 50),
                    `+5% To Maximum Lightning Resist
+10% To Maximum Fire Resist`
                ]
            },
            Pride: {
                name: 'Pride',
                itemTypes: 'poleArm',
                ...runes('Cham', 'Sur', 'Io', 'Lo'),
                effects: [
                    `25% Chance To Cast Level 17 Fire Wall When Struck`,
                    auraRange(16, 20, 'Concentration'),
                    `260-300% Bonus To Attack Rating (varies)
+(1*Clvl)% Damage To Demons (Based on Character Level)`,
                    rng('DamageLightning', 50, 280),
                    `20% Deadly Strike
Hit Blinds Target
Freezes Target +3`,
                    int('StatVitality', 10),
                    `Replenish Life +8
(1.875*Clvl)% Extra Gold From Monsters (Based on Character Level)`
                ]
            },
            Principle: {
                name: 'Principle',
                itemTypes: 'armorBody',
                ...runes('Ral', 'Gul', 'Eld'),
                effects: [
                    `100% Chance To Cast Level 5 Holy Bolt On Striking`,
                    skillAll(2, 'paladin'),
                    pct('DamageUndead', 50),
                    `+100-150 to Life (varies)
15% Slower Stamina Drain
+5% To Maximum Poison Resist`,
                    pct('ResistFire', 30)
                ]
            },
            Prudence: {
                name: 'Prudence',
                itemTypes: 'armorBody',
                ...runes('Mal', 'Tir'),
                effects: [
                    `+25% Faster Hit Recovery
+140-170% Enhanced Defense (varies)
All Resistances +25-35 (varies)`,
                    int('ReduceDamage', 3),
                    int('ReduceDamageMagic', 17),
                    int('OnKillMana', 2),
                    int('StatLightRadius', 1),
                    `Repairs Durability 1 In 4 Seconds`
                ]
            },
            Radiance: {
                name: 'Radiance',
                itemTypes: all('armorHead'),
                ...runes('Nef', 'Sol', 'Ith'),
                effects: [
                    `+75% Enhanced Defense`,
                    int('StatDefenseMissile', 30),
                    int('StatVitality', 10),
                    int('StatEnergy', 10),
                    int('StatMana', 33),
                    int('ReduceDamage', 7),
                    int('ReduceDamageMagic', 3),
                    `15% Damage Taken Goes to Mana`,
                    int('StatLightRadius', 5)
                ]
            },
            Rain: {
                name: 'Rain',
                itemTypes: 'armorBody',
                ...runes('Ort', 'Mal', 'Ith'),
                effects: [
                    `5% Chance To Cast Level 15 Cyclone Armor When Struck
5% Chance To Cast Level 15 Twister On Striking`,
                    skillAll(2, 'druid'),
                    `+100-150 To Mana (varies)`,
                    pct('ResistLightning', 30),
                    int('ReduceDamageMagic', 7),
                    `15% Damage Taken Goes to Mana`
                ]
            },
            Rhyme: {
                name: 'Rhyme',
                itemTypes: all('shield'),
                ...runes('Shael', 'Eth'),
                effects: [
                    `+40% Faster Block Rate
20% Increased Chance of Blocking`,
                    pct('StatRegenMana', 15),
                    int('ResistAll', 25),
                    int('CannotBeFrozen'),
                    pct('ExtraGold', 50),
                    pct('MagicFind', 25)
                ]
            },
            Rift: {
                name: 'Rift',
                itemTypes: ['poleArm', 'scepter'],
                ...runes('Hel', 'Ko', 'Lem', 'Gul'),
                effects: [
                    `20% Chance To Cast Level 16 Tornado On Striking
16% Chance To Cast Level 21 Frozen Orb On Attack
20% Bonus To Attack Rating`,
                    rng('DamageMagic', 160, 250), rng('DamageFire', 60, 180),
                    `+5-10 To All Attributes (varies)`,
                    int('StatDexterity', 10),
                    `38% Damage Taken Goes To Mana`,
                    pct('ExtraGold', 75),
                    charge(15, 'Iron Maiden', 40),
                    `Requirements -20%`
                ]
            },
            Sanctuary: {
                name: 'Sanctuary',
                itemTypes: 'shield',
                ...runes('Ko', 'Ko', 'Mal'),
                effects: [
                    `+20% Faster Hit Recovery
+20% Faster Block Rate
20% Increased Chance of Blocking
+130-160% Enhanced Defense (varies)`,
                    int('StatDefenseMissile', 250),
                    int('StatDexterity', 20),
                    `All Resistances +50-70 (varies)`,
                    int('ReduceDamageMagic', 7),
                    charge(12, 'Slow Missiles', 60)
                ]
            },
            Silence: {
                name: 'Silence',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Dol', 'Eld', 'Hel', 'Ist', 'Tir', 'Vex'),
                effects: [
                    skillAll(2),
                    `+20% Increased Attack Speed
+20% Faster Hit Recovery`,
                    pct('DamageEnhanced', 200),
                    pct('DamageUndead', 75),
                    int('ARUndead', 50),
                    pct('LeechMana', 11),
                    `Hit Blinds Target +33
Hit Causes Monster to Flee 25%`,
                    int('ResistAll', 75),
                    int('OnKillMana', 2),
                    pct('MagicFind', 30),
                    `Requirements -20%`
                ]
            },
            Smoke: {
                name: 'Smoke',
                itemTypes: 'armorBody',
                ...runes('Nef', 'Lum'),
                effects: [
                    `+20% Faster Hit Recovery
+75% Enhanced Defense`,
                    int('StatDefenseMissile', 280),
                    int('StatEnergy', 10),
                    int('ResistAll', 50),
                    `-1 to Light Radius`,
                    charge(6, 'Weaken', 18)
                ]
            },
            Spirit: {
                name: 'Spirit',
                itemTypes: ['sword', 'shield'],
                ...runes('Tal', 'Thul', 'Ort', 'Amn'),
                effects: [
                    skillAll(2),
                    `+25-35% Faster Cast Rate (varies)
+55% Faster Hit Recovery`,
                    int('StatDefenseMissile', 250),
                    int('StatVitality', 22),
                    `+89-112 To Mana (varies)
+3-8 Magic Absorb (varies)
Shields`,
                    pct('ResistCold', 35),
                    pct('ResistLightning', 35),
                    pct('ResistPoison', 35),
                    int('Thorns', 14),
                    `Swords`,
                    rng('DamageLightning', 1, 50),
                    rng('DamageColdDuration', 3, 14, 3),
                    dot('DamagePoison', 75, 5),
                    pct('LeechLife', 7)
                ]
            },
            Splendor: {
                name: 'Splendor',
                itemTypes: 'shield',
                ...runes('Eth', 'Lum'),
                effects: [
                    skillAll(1),
                    `+10% Faster Cast Rate
+20% Faster Block Rate
+60-100% Enhanced Defense (varies)`,
                    int('StatEnergy', 10),
                    pct('StatRegenMana', 15),
                    pct('ExtraGold', 50),
                    pct('MagicFind', 20),
                    int('StatLightRadius', 3)
                ]
            },
            Stealth: {
                name: 'Stealth',
                itemTypes: 'armorBody',
                ...runes('Tal', 'Eth'),
                effects: [
                    `+25% Faster Run/Walk
+25% Faster Casting Rate
+25% Faster Hit Recovery`,
                    int('StatDexterity', 6),
                    pct('StatRegenMana', 15),
                    `+15 Maximum Stamina`,
                    pct('ResistPoison', 30),
                    int('ReduceDamageMagic', 3)
                ]
            },
            Steel: {
                name: 'Steel',
                itemTypes: ['sword', 'axe', 'mace'],
                ...runes('Tir', 'El'),
                effects: [
                    `+25% Increased Attack Speed`,
                    pct('DamageEnhanced', 20),
                    int('DamageMinimum', 3),
                    int('DamageMaximum', 3),
                    int('AttackRating', 50),
                    pct('ChanceOpenWounds', 50),
                    int('OnKillMana', 2),
                    int('StatLightRadius', 1)
                ]
            },
            Stone: {
                name: 'Stone',
                itemTypes: 'armorBody',
                ...runes('Shael', 'Um', 'Pul', 'Lum'),
                effects: [
                    `+60% Faster Hit Recovery
+250-290% Enhanced Defense (varies)`,
                    int('StatDefenseMissile', 300),
                    int('StatStrength', 16),
                    int('StatVitality', 16),
                    int('StatEnergy', 10),
                    int('ResistAll', 15),
                    charge(16, 'Molten Boulder', 80),
                    charge(16, 'Clay Golem', 16)
                ]
            },
            Strength: {
                name: 'Strength',
                itemTypes: all('weaponsMelee'),
                ...runes('Amn', 'Tir'),
                effects: [
                    pct('DamageEnhanced', 35),
                    pct('LeechLife', 7),
                    pct('ChanceCrushingBlow', 25),
                    int('StatStrength', 20),
                    int('StatVitality', 10),
                    int('OnKillMana', 2)
                ]
            },
            Treachery: {
                name: 'Treachery',
                itemTypes: 'armorBody',
                ...runes('Shael', 'Thul', 'Lem'),
                effects: [
                    `5% Chance To Cast Level 15 Fade When Struck
25% Chance To Cast level 15 Venom On Striking`,
                    skillAll(2, 'assassin'),
                    `+45% Increased Attack Speed
+20% Faster Hit Recovery`,
                    pct('ResistCold', 30),
                    pct('ExtraGold', 50)
                ]
            },
            Venom: {
                name: 'Venom',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Tal', 'Dol', 'Mal'),
                effects: [
                    int('Piercing'),
                    dot('DamagePoison', 273, 6),
                    pct('LeechMana', 7),
                    int('PreventMonsterHealing'),
                    `Hit Causes Monster To Flee 25%`,
                    charge(13, 'Poison Nova', 11),
                    charge(15, 'Poison Explosion', 27)
                ]
            },
            'Voice of Reason': {
                name: 'Voice of Reason',
                itemTypes: ['mace', 'sword'],
                ...runes('Lem', 'Ko', 'El', 'Eld'),
                effects: [
                    `15% Chance To Cast Level 13 Frozen Orb On Striking
18% Chance To Cast Level 20 Ice Blast On Striking`,
                    int('AttackRating', 50),
                    `+220-350% Damage To Demons (varies)
+355-375% Damage To Undead (varies)`,
                    int('ARUndead', 50),
                    rng('DamageCold', 100, 220),
                    `-24% To Enemy Cold Resistance`,
                    int('StatDexterity', 10),
                    int('CannotBeFrozen'),
                    pct('ExtraGold', 75),
                    int('StatLightRadius', 1)
                ]
            },
            Wealth: {
                name: 'Wealth',
                itemTypes: 'armorBody',
                ...runes('Lem', 'Ko', 'Tir'),
                effects: [
                    int('StatDexterity', 10),
                    int('OnKillMana', 2),
                    pct('ExtraGold', 300),
                    pct('MagicFind', 100)
                ]
            },
            White: {
                name: 'White',
                itemTypes: 'wand',
                ...runes('Dol', 'Io'),
                effects: [
                    skillGroup(3, 'Poison and Bone Skills', 'necromancer'),
                    `+20% Faster Cast Rate`,
                    skillClass(2, 'Bone Spear', 'necromancer'),
                    skillClass(4, 'Skeleton Mastery', 'necromancer'),
                    skillClass(3, 'Bone Armor', 'necromancer'),
                    `Hit causes monster to flee 25%`,
                    int('StatVitality', 10),
                    int('StatMana', 13),
                    int('ReduceDamageMagic', 13)
                ]
            },
            Wind: {
                name: 'Wind',
                itemTypes: all('weaponsMelee'),
                ...runes('Sur', 'El'),
                effects: [
                    `10% Chance To Cast Level 9 Tornado On Striking
+20% Faster Run/Walk
+40% Increased Attack Speed
+15% Faster Hit Recovery`,
                    pct('DamageEnhancedRange', 120, 160),
                    pct('DefenseTarget', -50),
                    int('AttackRating', 50),
                    `Hit Blinds Target`,
                    int('StatLightRadius', 1),
                    charge(13, 'Twister', 127)
                ]
            },
            Wrath: {
                name: 'Wrath',
                itemTypes: bows,
                ...runes('Pul', 'Lum', 'Ber', 'Mal'),
                effects: [
                    `30% Chance To Cast Level 1 Decrepify On Striking
5% Chance To Cast Level 10 Life Tap On Striking`,
                    pct('DamageDemons', 375),
                    int('ARDemons', 100),
                    `+250-300% Damage To Undead (varies)`,
                    rng('DamageMagic', 85, 120), rng('DamageLightning', 41, 240),
                    pct('ChanceCrushingBlow', 20),
                    int('PreventMonsterHealing'),
                    int('StatEnergy', 10),
                    int('CannotBeFrozen')
                ]
            },
            Zephyr: {
                name: 'Zephyr',
                itemTypes: bows,
                ...runes('Ort', 'Eth'),
                effects: [
                    `7% Chance to Cast Level 1 Twister When Struck
+25% Faster Run/Walk
+25% Increased Attack Speed`,
                    pct('DamageEnhanced', 33),
                    pct('DamageEnhanced', 33),
                    pct('DefenseTarget', -25),
                    int('AttackRating', 66),
                    rng('DamageLightning', 1, 50),
                    int('StatDefense', 25)
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
