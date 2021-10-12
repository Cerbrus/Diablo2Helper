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
            integerEffect: int,
            percentageEffect: pct,
            rangeEffect: rng,
            damageOverTimeEffect: dot
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
                    `Level 9 Fanaticism Aura When Equipped
+40% Increased Attack Speed
+240-270% Enhanced Damage (varies)`,
                    pct('ChanceCrushingBlow', 20),
                    pct('ChanceOpenWounds', 25),
                    `+3 to Werebear
+3 to Lycanthropy`,
                    int('PreventMonsterHealing'),
                    '+25-40 to Strength (varies)',
                    int('StatEnergy', 10),
                    int('OnKillMana', 2),
                    'Level 13 Summon Grizzly (5 Charges)'
                ]
            },
            Black: {
                name: 'Black',
                itemTypes: ['club', 'mace', 'hammer'],
                ...runes('Thul', 'Io', 'Nef'),
                effects: [
                    `+15% Increased Attack Speed
+120% Enhanced Damage`,
                    int('AttackRating', 200),
                    rng('DamageCold', 3, 14, 3),
                    `40% Chance of Crushing Blow`,
                    int('KnockBack'),
                    int('StatVitality', 10),
                    int('ReduceDamageMagic', 2),
                    `Level 4 Corpse Explosion (12 Charges)`
                ]
            },
            Bone: {
                name: 'Bone',
                itemTypes: 'armorBody',
                ...runes('Sol', 'Um', 'Um'),
                effects: [
                    `15% Chance To Cast level 10 Bone Armor When Struck
15% Chance To Cast level 10 Bone Spear On Striking
+2 To Necromancer Skill Levels
+100-150 To Mana (varies)`,
                    int('ResistAll', 30),
                    `Damage Reduced By 7`
                ]
            },
            Bramble: {
                name: 'Bramble',
                itemTypes: 'armorBody',
                ...runes('Ral', 'Ohm', 'Sur', 'Eth'),
                effects: [
                    `Level 15-21 Thorns Aura When Equipped (varies)
+50% Faster Hit Recovery
+25-50% To Poison Skill Damage (varies)`,
                    int('StatDefense', 300), `
Increase Maximum Mana 5%`,
                    pct('StatRegenMana', 15), `
+5% To Maximum Cold Resist`,
                    pct('ResistFire', 30),
                    pct('ResistPoison', 100),
                    `+13 Life After Each Kill
Level 13 Spirit of Barbs (33 Charges)`
                ]
            },
            Brand: {
                name: 'Brand',
                itemTypes: bows,
                ...runes('Jah', 'Lo', 'Mal', 'Gul'),
                effects: [
                    `35% Chance To Cast Level 14 Amplify Damage When Struck
100% Chance To Cast Level 18 Bone Spear On Striking
Fires Explosive Arrows or Bolts (15)
+260-340% Enhanced Damage (varies)`,
                    int('Piercing'), `
20% Bonus to Attack Rating
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
                    `+60% Increased Attack Speed
+350-400% Enhanced Damage (varies)`,
                    pct('DefenseTarget', -25),
                    int('AttackRating', 50),
                    pct('DamageUndead', 200),
                    int('ARUndead', 50),
                    pct('LeechMana', 7),
                    `12-15% Life Stolen Per Hit (varies)`,
                    int('PreventMonsterHealing'),
                    `+30 To All Attributes`,
                    int('StatLightRadius', 1), `
Requirements -20%`
                ]
            },
            'Call to Arms': {
                name: 'Call to Arms',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Amn', 'Ral', 'Mal', 'Ist', 'Ohm'),
                effects: [
                    `+1 To All Skills
+40% Increased Attack Speed
+240-290% Enhanced Damage (varies)`,
                    rng('DamageFire', 5, 30),
                    pct('LeechLife', 7),
                    `+2-6 To Battle Command (varies)
+1-6 To Battle Orders (varies)
+1-4 To Battle Cry (varies)`,
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
                    `+2 To All Skills`,
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
+35% Increased Attacked Speed
+240-290% Enhanced Damage (varies)`,
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
+20% Increased Attack Speed
+180-220% Enhanced Damage (varies)`,
                    int('Piercing'), `
-35% To Enemy Lightning Resistance`,
                    pct('ChanceOpenWounds', 25),
                    `+9-11 Magic Absorb (varies)`,
                    int('OnKillMana', 2),
                    `Level 18 Summon Spirit Wolf (30 Charges)`
                ]
            },
            Death: {
                name: 'Death',
                itemTypes: ['sword', 'axe'],
                ...runes('Hel', 'El', 'Vex', 'Ort', 'Gul'),
                effects: [
                    int('Indestructible'),
                    `100% Chance To Cast Level 44 Chain Lightning When You Die
25% Chance To Cast Level 18 Glacial Spike On Attack
+300-385% Enhanced Damage (varies)
20% Bonus To Attack Rating`,
                    int('AttackRating', 50),
                    rng('DamageLightning', 1, 50),
                    pct('LeechMana', 7),
                    `50% Chance of Crushing Blow
(0.5*Clvl)% Deadly Strike (Based on Character Level)`,
                    int('StatLightRadius', 1), `
Level 22 Blood Golem (15 Charges)
Requirements -20%`
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
11% Chance To Cast lvl 18 Confuse On Striking
+2 To All Skills`,
                    int('StatDefense', 261),
                    int('StatVitality', 10),
                    pct('ExtraGold', 50),
                    pct('MagicFind', 25),
                    `Level 17 Attract (60 Charges)`
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
15% Chance To Cast Level 22 Nova On Attack
+350% Enhanced Damage`,
                    int('Piercing'),
                    rng('DamageMagic', 100, 180),
                    pct('LeechMana', 7),
                    `20% Chance Of Crushing Blow
20% Deadly Strike`,
                    int('PreventMonsterHealing'),
                    int('StatDexterity', 10)
                ]
            },
            Doom: {
                name: 'Doom',
                itemTypes: ['axe', 'hammer', 'poleArm'],
                ...runes('Hel', 'Ohm', 'Um', 'Lo', 'Cham'),
                effects: [
                    `5% Chance To Cast Level 18 Volcano On Striking
Level 12 Holy Freeze Aura When Equipped
+2 To All Skills
+45% Increased Attack Speed
+330-370% Enhanced Damage (varies)
-40-60% To Enemy Cold Resistance (varies)
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
12% Chance To Cast Level 15 Hydra On Striking
Level 14 Holy Fire Aura When Equipped`,
                    int('StatDefense', 360),
                    int('StatDefenseMissile', 230), `
+3-5 To All Attributes (varies)
+(0.375*Clvl) To Strength (Based on Character Level)
+5% To Maximum Lightning Resist`,
                    int('ReduceDamage', 7), `
Armor
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
                    `10% Chance To Cast Level 15 Confuse When Struck
Level 15 Holy Shock Aura When Equipped
+20-30% Faster Hit Recovery (varies)
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
                    `40% faster hit Recovery
+10-20% Enhanced Damage (varies)`,
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
                    `Level 15 Thorns Aura When Equipped
+35% Increased Attack Speed
+320-380% Damage To Demons (varies)`,
                    pct('DamageUndead', 280),
                    `+75 Poison Damage Over 5 Seconds`,
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
                    `+2 To All Skills
+45% Faster Run/Walk
+1 To Teleport
+750-775 Defense (Varies)
+(0.75*Clvl) To Strength (Based On Character Level)
Increase Maximum Life 5%`,
                    pct('ReduceDamage', 8), `
+14 Life After Each Kill
15% Damage Taken Goes To Mana
(1*Clvl)% Better Chance of Getting Magic Items (Based On Character Level)`
                ]
            },
            Enlightenment: {
                name: 'Enlightenment',
                itemTypes: 'armorBody',
                ...runes('Pul', 'Ral', 'Sol'),
                effects: [
                    `5% Chance To Cast Level 15 Blaze When Struck
5% Chance To Cast level 15 Fire Ball On Striking
+2 To Sorceress Skill Levels
+1 To Warmth
+30% Enhanced Defense`,
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
                    `+260-310% Enhanced Damage (varies)`,
                    int('DamageMinimum', 9),
                    pct('LeechLife', 7),
                    `20% Chance of Crushing Blow
Hit Blinds Target`,
                    int('ChanceBlind'),
                    `Slows Target By 33%
Replenish Mana 16%`,
                    int('CannotBeFrozen'),
                    pct('MagicFind', 30),
                    `Level 8 Revive (88 Charges)`
                ]
            },
            Exile: {
                name: 'Exile',
                itemTypes: 'paladinShield',
                ...runes('Vex', 'Ohm', 'Ist', 'Dol'),
                effects: [
                    `15% Chance To Cast Level 5 Life Tap On Striking
Level 13-16 Defiance Aura When Equipped (varies)
+2 To Offensive Auras (Paladin Only)
+30% Faster Block Rate
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
                    `Level 12-15 Fanaticism Aura When Equipped (varies)
+1-2 To All Skills (varies)
+330% Enhanced Damage`,
                    int('Piercing'), `
300% Bonus To Attack Rating`,
                    pct('DamageUndead', 75),
                    int('AttackRating', 50),
                    ` Against Undead
+120 Fire Damage`,
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
                    `+30% Increased Attack Speed
+320-370% Enhanced Damage (varies)`,
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
+25% Faster Cast Rate
+300% Enhanced Damage
+200% Enhanced Defense
+((8-12)*0.125*Clvl) To Life (Based on Character Level) (varies)
All Resistances +25-30 (varies)
12% Damage Taken Goes To Mana`,
                    int('StatLightRadius', 1), `
Weapons`,
                    int('DamageMinimum', 9),
                    int('AttackRating', 50),
                    `20% Deadly Strike
Hit Causes Monster To Flee 25%
Armor`,
                    int('StatDefense', 15), `
Replenish Life +7
+5% To Maximum Lightning Resist`,
                    int('ReduceDamage', 7)
                ]
            },
            Fury: {
                name: 'Fury',
                itemTypes: all('weaponsMelee'),
                ...runes('Jah', 'Gul', 'Eth'),
                effects: [
                    `40% Increased Attack Speed
+209% Enhanced Damage`,
                    int('Piercing'),
                    pct('DefenseTarget', -25),
                    `20% Bonus to Attack Rating`,
                    pct('LeechLife', 6),
                    `33% Chance Of Deadly Strike`,
                    pct('ChanceOpenWounds', 66),
                    `+5 To Frenzy (Barbarian Only)`,
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
100% Chance To Cast Level 48 Meteor When You Die
Level 16 Holy Fire Aura When Equipped
+33% Increased Attack Speed
+280-330% Enhanced Damage (varies)`,
                    int('Piercing'), `
-20% To Enemy Fire Resistance`,
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
                    `Level 10 Vigor Aura When Equipped
+200-275% Enhanced Damage (varies)`,
                    int('DamageMinimum', 9),
                    int('DamageMaximum', 9), rng('DamageFire', 55, 160), rng('DamageLightning', 55, 160),
                    rng('DamageCold', 55, 160),
                    `+2-6 To Valkyrie (varies)`,
                    int('StatDexterity', 10),
                    pct('StatRegenMana', 20),
                    int('OnKillMana', 2),
                    int('StatLightRadius', 2), `
Level 20 Revive (25 Charges)`
                ]
            },
            'Heart of the Oak': {
                name: 'Heart of the Oak',
                itemTypes: ['stave', 'mace'],
                ...runes('Ko', 'Vex', 'Pul', 'Thul'),
                effects: [
                    `+3 To All Skills
+40% Faster Cast Rate`,
                    pct('DamageDemons', 75),
                    int('AttackRating', 100),
                    ` Against Demons`,
                    rng('DamageCold', 3, 14),
                    pct('LeechMana', 7),
                    int('StatDexterity', 10),
                    `Replenish Life +20
Increase Maximum Mana 15%
All Resistances +30-40 (varies)
Level 4 Oak Sage (25 Charges)
Level 14 Raven (60 Charges)`
                ]
            },
            'Holy Thunder': {
                name: 'Holy Thunder',
                itemTypes: 'scepter',
                ...runes('Eth', 'Ral', 'Ort', 'Tal'),
                effects: [
                    `+60% Enhanced Damage`,
                    int('DamageMaximum', 10),
                    pct('DefenseTarget', -25), rng('DamageFire', 5, 30), rng('DamageLightning', 21, 110),
                    `+75 Poison Damage over 5 secs
+3 to Holy Shock (Paladin Only)
+5% to Maximum Lightning Resist`,
                    pct('ResistLightning', 60),
                    `Level 7 Chain Lightning (60 charges)`
                ]
            },
            Honor: {
                name: 'Honor',
                itemTypes: 'weaponsMelee',
                ...runes('Amn', 'El', 'Ith', 'Tir', 'Sol'),
                effects: [
                    `+1 to all skills
+160% Enhanced Damage`,
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
25% Chance To Cast Level 22 Frost Nova On Striking
Level 18 Holy Freeze Aura When Equipped
+20% Increased Attack Speed
+140-210% Enhanced Damage (varies)`,
                    int('Piercing'), `
+25-30% To Cold Skill Damage (varies)`,
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
                    `50% Chance To Cast Level 20 Chain Lightning When You Kill An Enemy
Level 12 Conviction Aura When Equipped
+35% Faster Run/Walk
+255-325% Enhanced Damage (varies)
-(45-55)% To Enemy Lightning Resistance (varies)
40% Chance of Crushing Blow`,
                    int('PreventMonsterHealing'),
                    `+(0.5*Clvl) To Vitality (Based on Character Level)`,
                    pct('MagicFind', 30),
                    `Level 21 Cyclone Armor (30 Charges)`
                ]
            },
            Insight: {
                name: 'Insight',
                itemTypes: ['poleArm', 'stave'],
                ...runes('Ral', 'Tir', 'Tal', 'Sol'),
                effects: [
                    `Level 12-17 Meditation Aura When Equipped (varies)
+35% Faster Cast Rate
+200-260% Enhanced Damage (varies)`,
                    int('DamageMinimum', 9),
                    `180-250% Bonus to Attack Rating (varies)`,
                    rng('DamageFire', 5, 30),
                    `+75 Poison Damage Over 5 Seconds
+1-6 To Critical Strike (varies)
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
                    `+100% Enhanced Damage`,
                    int('AttackRating', 150),
                    pct('DamageDemons', 100),
                    int('AttackRating', 100),
                    ` against Demons`,
                    pct('DamageUndead', 50),
                    int('AttackRating', 100),
                    ` against Undead`,
                    rng('DamageFire', 5, 30), rng('DamageCold', 3, 14),
                    pct('LeechLife', 7)
                ]
            },
            Kingslayer: {
                name: 'Kingslayer',
                itemTypes: ['sword', 'axe'],
                ...runes('Mal', 'Um', 'Gul', 'Fal'),
                effects: [
                    `+30% Increased Attack Speed
+230-270% Enhanced Damage (varies)`,
                    pct('DefenseTarget', -25),
                    `20% Bonus To Attack Rating
33% Chance of Crushing Blow`,
                    pct('ChanceOpenWounds', 50),
                    `+1 To Vengeance`,
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
20% Chance To Cast Level 20 Charged Bolt On Attack
Level 17 Might Aura When Equipped
+330-375% Enhanced Damage (varies)`,
                    int('Piercing'), `
60-70% Chance of Crushing Blow (varies)`,
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
                    `20% Chance To Cast Level 15 Decrepify On Striking
Level 16-18 Sanctuary Aura When Equipped (varies)`,
                    pct('DefenseTarget', -50), rng('DamageFire', 150, 210), rng('DamageCold', 130, 180),
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
                    `+3 to Fire Skills`,
                    rng('DamageFire', 5, 30),
                    `+3 to Inferno (Sorceress Only)
+3 to Warmth (Sorceress Only)
+3 to Fire Bolt (Sorceress Only)
+(2*Clvl) Defence (Based on Character Level)`,
                    pct('ResistCold', 33),
                    int('OnKillMana', 2)
                ]
            },
            Lionheart: {
                name: 'Lionheart',
                itemTypes: 'armorBody',
                ...runes('Hel', 'Lum', 'Fal'),
                effects: [
                    `+20% Enhanced Damage`,
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
                    `+1 to All Skills`,
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
                    `+33% Enhanced Damage`,
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
                    `+3 To Bow and Crossbow Skills (Amazon Only)
+20% Increased Attack Speed
+50% Enhanced Damage`,
                    pct('DamageUndead', 300),
                    `+3 To Slow Missiles (Amazon Only)
+3 To Dodge (Amazon Only)
+3 To Critical Strike (Amazon Only)`,
                    int('KnockBack'),
                    int('StatDexterity', 10)
                ]
            },
            Memory: {
                name: 'Memory',
                itemTypes: 'stave',
                ...runes('Lum', 'Io', 'Sol', 'Eth'),
                effects: [
                    `+3 To Sorceress Skill Levels
+33% Faster Cast Rate`,
                    int('DamageMinimum', 9),
                    `-25% Target Defence`,
                    int('StatEnergy', 3),
                    ` Shield (Sorceress Only)
+2 To Static Field (Sorceress Only)
+50% Enhanced Defense`,
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
10% Chance To Cast Level 1 Taunt On Striking
+2 To Barbarian Skill Levels`,
                    int('StatDefenseMissile', 30), `
Replenish Life +10
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
                    `-3 to Light Radius
Level 13 Cloak of Shadows (9 charges)`
                ]
            },
            Oath: {
                name: 'Oath',
                itemTypes: ['axe', 'mace', 'sword'],
                ...runes('Shael', 'Pul', 'Mal', 'Lum'),
                effects: [
                    int('Indestructible'),
                    `30% Chance To Cast Level 20 Bone Spirit On Striking
+50% Increased Attack Speed
+210-340% Enhanced Damage (varies)`,
                    pct('DamageDemons', 75),
                    int('AttackRating', 100),
                    ` Against Demons`,
                    int('PreventMonsterHealing'),
                    int('StatEnergy', 10),
                    `+10-15 Magic Absorb (varies)
Level 16 Heart of Wolverine (20 Charges)
Level 17 Iron Golem (14 Charges)`
                ]
            },
            Obedience: {
                name: 'Obedience',
                itemTypes: 'poleArm',
                ...runes('Hel', 'Ko', 'Thul', 'Eth', 'Fal'),
                effects: [
                    `30% Chance To Cast Level 21 Enchant When You Kill An Enemy
+40% Faster Hit Recovery
+370% Enhanced Damage`,
                    pct('DefenseTarget', -25), rng('DamageCold', 3, 14, 3),
                    `-25% To Enemy Fire Resistance
40% Chance of Crushing Blow
+200-300 Defense (varies)`,
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
                    `+25% Increased Attack Speed
+160-210% Enhanced Damage (varies)
50-80% Bonus To Attack Rating (varies)`,
                    pct('DamageUndead', 75),
                    int('AttackRating', 50),
                    ` Against Undead`,
                    rng('DamageLightning', 1, 50),
                    `+1 To Berserk
+1 To Zeal
Hit Blinds Target +10
Hit Causes Monster To Flee 25%`,
                    pct('ExtraGold', 75),
                    `Level 3 Heart of Wolverine (12 Charges)`
                ]
            },
            Peace: {
                name: 'Peace',
                itemTypes: 'armorBody',
                ...runes('Shael', 'Thul', 'Amn'),
                effects: [
                    `4% Chance To Cast Level 5 Slow Missiles When Struck
2% Chance To Cast level 15 Valkyrie On Striking
+2 To Amazon Skill Levels
+20% Faster Hit Recovery
+2 To Critical Strike`,
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
40% Chance To Cast Level 22 Firestorm On Striking
Level 10-15 Redemption Aura When Equipped (varies)
+350-400% Enhanced Damage (varies)
-28% To Enemy Fire Resistance
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
                    `25% Chance To Cast Level 17 Fire Wall When Struck
Level 16-20 Concentration Aura When Equipped (varies)
260-300% Bonus To Attack Rating (varies)
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
                    `100% Chance To Cast Level 5 Holy Bolt On Striking
+2 To Paladin Skill Levels`,
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
                    int('StatLightRadius', 1), `
Repairs Durability 1 In 4 Seconds`
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
5% Chance To Cast Level 15 Twister On Striking
+2 To Druid Skills
+100-150 To Mana (varies)`,
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
                    `Level 15 Iron Maiden (40 Charges)
Requirements -20%`
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
                    `Level 12 Slow Missiles (60 Charges)`
                ]
            },
            Silence: {
                name: 'Silence',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Dol', 'Eld', 'Hel', 'Ist', 'Tir', 'Vex'),
                effects: [
                    `+2 to All Skills
+20% Increased Attack Speed
+20% Faster Hit Recovery
+200% Enhanced Damage`,
                    pct('DamageUndead', 75),
                    int('AttackRating', 50),
                    ` Against Undead`,
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
                    `-1 to Light Radius
Level 6 Weaken (18 charges)`
                ]
            },
            Spirit: {
                name: 'Spirit',
                itemTypes: ['sword', 'shield'],
                ...runes('Tal', 'Thul', 'Ort', 'Amn'),
                effects: [
                    `+2 To All Skills
+25-35% Faster Cast Rate (varies)
+55% Faster Hit Recovery`,
                    int('StatDefenseMissile', 250),
                    int('StatVitality', 22),
                    `+89-112 To Mana (varies)
+3-8 Magic Absorb (varies)
Shields`,
                    pct('ResistCold', 35),
                    pct('ResistLightning', 35),
                    pct('ResistPoison', 35),
                    `Attacker Takes Damage of 14
Swords`,
                    rng('DamageLightning', 1, 50), rng('DamageCold', 3, 14),
                    ` (3 Sec,Normal)
+75 Poison Damage Over 5 Seconds`,
                    pct('LeechLife', 7)
                ]
            },
            Splendor: {
                name: 'Splendor',
                itemTypes: 'shield',
                ...runes('Eth', 'Lum'),
                effects: [
                    `+1 To All Skills
+10% Faster Cast Rate
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
                    pct('StatRegenMana', 15), `
                    +15 Maximum Stamina`,
                    pct('ResistPoison', 30),
                    int('ReduceDamageMagic', 3)
                ]
            },
            Steel: {
                name: 'Steel',
                itemTypes: ['sword', 'axe', 'mace'],
                ...runes('Tir', 'El'),
                effects: [
                    `+25% Increased Attack Speed
+20% Enhanced Damage`,
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
                    `Level 16 Molten Boulder (80 Charges)
Level 16 Clay Golem (16 Charges)`
                ]
            },
            Strength: {
                name: 'Strength',
                itemTypes: all('weaponsMelee'),
                ...runes('Amn', 'Tir'),
                effects: [
                    `+35% Enhanced Damage`,
                    pct('LeechLife', 7),
                    `25% Chance of Crushing Blow`,
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
25% Chance To Cast level 15 Venom On Striking
+2 To Assassin Skills
+45% Increased Attack Speed
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
                    int('Piercing'), `
+273 Poison Damage Over 6 Seconds`,
                    pct('LeechMana', 7),
                    int('PreventMonsterHealing'),
                    `Hit Causes Monster To Flee 25%
Level 13 Poison Nova (11 Charges)
Level 15 Poison Explosion (27 Charges)`
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
                    int('AttackRating', 50),
                    ` Against Undead`,
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
                    `+3 to Poison and Bone Skills (Necromancer Only)
+20% Faster Cast Rate
+2 to Bone Spear (Necromancer Only)
+4 to Skeleton Mastery (Necromancer Only)
+3 to Bone Armor (Necromancer Only)
Hit causes monster to flee 25%`,
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
+15% Faster Hit Recovery
+120-160% Enhanced Damage (varies)`,
                    pct('DefenseTarget', -50),
                    int('AttackRating', 50),
                    `Hit Blinds Target`,
                    int('StatLightRadius', 1), `
Level 13 Twister (127 Charges)`
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
                    int('AttackRating', 100),
                    ` Against Demons
+250-300% Damage To Undead (varies)`,
                    rng('DamageMagic', 85, 120), rng('DamageLightning', 41, 240),
                    `20% Chance of Crushing Blow`,
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
+25% Increased Attack Speed
+33% Enhanced Damage`,
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
