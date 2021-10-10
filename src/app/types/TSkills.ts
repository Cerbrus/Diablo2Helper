// noinspection SpellCheckingInspection

import { ISkillArray, ISkillArrayUi } from '../interfaces';
import { TClass, TClassUi } from './TClass';

export const Skills: ISkillArray<TClass> = {
    amazon: [
        'Magic Arrow', 'Fire Arrow', 'Inner Sight', 'Critical Strike', 'Jab', 'Cold Arrow', 'Multiple Shot', 'Dodge',
        'Power Strike', 'Poison Javelin', 'Exploding Arrow', 'Slow Missiles', 'Avoid', 'Impale', 'Lightning Bolt',
        'Ice Arrow', 'Guided Arrow', 'Penetrate', 'Charged Strike', 'Plague Javelin', 'Strafe', 'Immolation Arrow',
        'Dopplezon', 'Evade', 'Fend', 'Freezing Arrow', 'Valkyrie', 'Pierce', 'Lightning Strike', 'Lightning Fury'
    ],
    assassin: [
        'Fire Trauma', 'Claw Mastery', 'Psychic Hammer', 'Tiger Strike', 'Dragon Talon', 'Shock Field',
        'Blade Sentinel', 'Quickness', 'Fists of Fire', 'Dragon Claw', 'Charged Bolt Sentry', 'Wake of Fire Sentry',
        'Weapon Block', 'Cloak of Shadows', 'Cobra Strike', 'Blade Fury', 'Fade', 'Shadow Warrior',
        'Claws of Thunder', 'Dragon Tail', 'Lightning Sentry', 'Inferno Sentry', 'Mind Blast', 'Blades of Ice',
        'Dragon Flight', 'Death Sentry', 'Blade Shield', 'Venom', 'Shadow Master', 'Royal Strike'
    ],
    barbarian: [
        'Bash', 'Sword Mastery', 'Axe Mastery', 'Mace Mastery', 'Howl', 'Find Potion', 'Leap', 'Double Swing',
        'Pole Arm Mastery', 'Throwing Mastery', 'Spear Mastery', 'Taunt', 'Shout', 'Stun', 'Double Throw',
        'Increased Stamina', 'Find Item', 'Leap Attack', 'Concentrate', 'Iron Skin', 'Battle Cry', 'Frenzy',
        'Increased Speed', 'Battle Orders', 'Grim Ward', 'Whirlwind', 'Berserk', 'Natural Resistance', 'War Cry',
        'Battle Command'
    ],
    druid: [
        'Raven', 'Plague Poppy', 'Wearwolf', 'Shape Shifting', 'Firestorm', 'Oak Sage', 'Summon Spirit Wolf',
        'Wearbear', 'Molten Boulder', 'Arctic Blast', 'Cycle of Life', 'Feral Rage', 'Maul', 'Eruption',
        'Cyclone Armor', 'Heart of Wolverine', 'Summon Fenris', 'Rabies', 'Fire Claws', 'Twister', 'Vines',
        'Hunger', 'Shock Wave', 'Volcano', 'Tornado', 'Spirit of Barbs', 'Summon Grizzly', 'Fury', 'Armageddon',
        'Hurricane'
    ],
    necromancer: [
        'Amplify Damage', 'Teeth', 'Bone Armor', 'Skeleton Mastery', 'Raise Skeleton', 'Dim Vision', 'Weaken',
        'Poison Dagger', 'Corpse Explosion', 'Clay Golem', 'Iron Maiden', 'Terror', 'Bone Wall', 'Golem Mastery',
        'Raise Skeletal Mage', 'Confuse', 'Life Tap', 'Poison Explosion', 'Bone Spear', 'BloodGolem', 'Attract',
        'Decrepify', 'Bone Prison', 'Summon Resist', 'IronGolem', 'Lower Resist', 'Poison Nova', 'Bone Spirit',
        'FireGolem', 'Revive'
    ],
    paladin: [
        'Sacrifice', 'Smite', 'Might', 'Prayer', 'Resist Fire', 'Holy Bolt', 'Holy Fire', 'Thorns', 'Defiance',
        'Resist Cold', 'Zeal', 'Charge', 'Blessed Aim', 'Cleansing', 'Resist Lightning', 'Vengeance',
        'Blessed Hammer', 'Concentration', 'Holy Freeze', 'Vigor', 'Conversion', 'Holy Shield', 'Holy Shock',
        'Sanctuary', 'Meditation', 'Fist of the Heavens', 'Fanaticism', 'Conviction', 'Redemption', 'Salvation'
    ],
    sorceress: [
        'Fire Bolt', 'Warmth', 'Charged Bolt', 'Ice Bolt', 'Frozen Armor', 'Inferno', 'Static Field', 'Telekinesis',
        'Frost Nova', 'Ice Blast', 'Blaze', 'Fire Ball', 'Nova', 'Lightning', 'Shiver Armor', 'Fire Wall', 'Enchant',
        'Chain Lightning', 'Teleport', 'Glacial Spike', 'Meteor', 'Thunder Storm', 'Energy Shield', 'Blizzard',
        'Chilling Armor', 'Fire Mastery', 'Hydra', 'Lightning Mastery', 'Frozen Orb', 'Cold Mastery'
    ]
};

export const SkillsUi: ISkillArrayUi<TClassUi> = {
    ...Skills,
    hireling: [
        'Inner Sight', 'Fire Arrow', 'Ice Arrow', 'Jab', 'Prayer', 'Defiance', 'Blessed Aim', 'Thorns',
        'Holy Freeze', 'Might', 'Inferno', 'Fire Ball', 'Glacial Spike', 'Frozen Armor', 'Charged Bolt',
        'Lightning', 'Ice Blast', 'Bash', 'Stun'
    ],
    ui: [
        'Blank', 'Attack', 'Unsummon', 'Throw', null, 'Left Hand Swing', 'Left Hand Throw',
        'Scroll of Identify', null, 'Scroll of Town Portal'
    ]
};

export type TSkillAmazon =
    'Magic Arrow' | 'Fire Arrow' | 'Inner Sight' | 'Critical Strike' | 'Jab' | 'Cold Arrow' | 'Multiple Shot' |
    'Dodge' | 'Power Strike' | 'Poison Javelin' | 'Exploding Arrow' | 'Slow Missiles' | 'Avoid' | 'Impale' |
    'Lightning Bolt' | 'Ice Arrow' | 'Guided Arrow' | 'Penetrate' | 'Charged Strike' | 'Plague Javelin' |
    'Strafe' | 'Immolation Arrow' | 'Dopplezon' | 'Evade' | 'Fend' | 'Freezing Arrow' | 'Valkyrie' | 'Pierce' |
    'Lightning Strike' | 'Lightning Fury';

export type TSkillAssassin =
    'Fire Trauma' | 'Claw Mastery' | 'Psychic Hammer' | 'Tiger Strike' | 'Dragon Talon' | 'Shock Field' |
    'Blade Sentinel' | 'Quickness' | 'Fists of Fire' | 'Dragon Claw' | 'Charged Bolt Sentry' | 'Wake of Fire Sentry' |
    'Weapon Block' | 'Cloak of Shadows' | 'Cobra Strike' | 'Blade Fury' | 'Fade' | 'Shadow Warrior' |
    'Claws of Thunder' | 'Dragon Tail' | 'Lightning Sentry' | 'Inferno Sentry' | 'Mind Blast' | 'Blades of Ice' |
    'Dragon Flight' | 'Death Sentry' | 'Blade Shield' | 'Venom' | 'Shadow Master' | 'Royal Strike';

export type TSkillBarbarian =
    'Bash' | 'Sword Mastery' | 'Axe Mastery' | 'Mace Mastery' | 'Howl' | 'Find Potion' | 'Leap' | 'Double Swing' |
    'Pole Arm Mastery' | 'Throwing Mastery' | 'Spear Mastery' | 'Taunt' | 'Shout' | 'Stun' | 'Double Throw' |
    'Increased Stamina' | 'Find Item' | 'Leap Attack' | 'Concentrate' | 'Iron Skin' | 'Battle Cry' | 'Frenzy' |
    'Increased Speed' | 'Battle Orders' | 'Grim Ward' | 'Whirlwind' | 'Berserk' | 'Natural Resistance' | 'War Cry' |
    'Battle Command';

export type TSkillDruid =
    'Raven' | 'Plague Poppy' | 'Wearwolf' | 'Shape Shifting' | 'Firestorm' | 'Oak Sage' | 'Summon Spirit Wolf' |
    'Wearbear' | 'Molten Boulder' | 'Arctic Blast' | 'Cycle of Life' | 'Feral Rage' | 'Maul' | 'Eruption' |
    'Cyclone Armor' | 'Heart of Wolverine' | 'Summon Fenris' | 'Rabies' | 'Fire Claws' | 'Twister' | 'Vines' |
    'Hunger' | 'Shock Wave' | 'Volcano' | 'Tornado' | 'Spirit of Barbs' | 'Summon Grizzly' | 'Fury' | 'Armageddon' |
    'Hurricane';

export type TSkillNecromancer =
    'Amplify Damage' | 'Teeth' | 'Bone Armor' | 'Skeleton Mastery' | 'Raise Skeleton' | 'Dim Vision' | 'Weaken' |
    'Poison Dagger' | 'Corpse Explosion' | 'Clay Golem' | 'Iron Maiden' | 'Terror' | 'Bone Wall' | 'Golem Mastery' |
    'Raise Skeletal Mage' | 'Confuse' | 'Life Tap' | 'Poison Explosion' | 'Bone Spear' | 'BloodGolem' | 'Attract' |
    'Decrepify' | 'Bone Prison' | 'Summon Resist' | 'IronGolem' | 'Lower Resist' | 'Poison Nova' | 'Bone Spirit' |
    'FireGolem' | 'Revive';

export type TSkillPaladin =
    'Sacrifice' | 'Smite' | 'Might' | 'Prayer' | 'Resist Fire' | 'Holy Bolt' | 'Holy Fire' | 'Thorns' | 'Defiance' |
    'Resist Cold' | 'Zeal' | 'Charge' | 'Blessed Aim' | 'Cleansing' | 'Resist Lightning' | 'Vengeance' |
    'Blessed Hammer' | 'Concentration' | 'Holy Freeze' | 'Vigor' | 'Conversion' | 'Holy Shield' | 'Holy Shock' |
    'Sanctuary' | 'Meditation' | 'Fist of the Heavens' | 'Fanaticism' | 'Conviction' | 'Redemption' | 'Salvation';

export type TSkillSorceress =
    'Fire Bolt' | 'Warmth' | 'Charged Bolt' | 'Ice Bolt' | 'Frozen Armor' | 'Inferno' | 'Static Field' | 'Telekinesis' |
    'Frost Nova' | 'Ice Blast' | 'Blaze' | 'Fire Ball' | 'Nova' | 'Lightning' | 'Shiver Armor' | 'Fire Wall' |
    'Enchant' | 'Chain Lightning' | 'Teleport' | 'Glacial Spike' | 'Meteor' | 'Thunder Storm' | 'Energy Shield' |
    'Blizzard' | 'Chilling Armor' | 'Fire Mastery' | 'Hydra' | 'Lightning Mastery' | 'Frozen Orb' | 'Cold Mastery';

export type TSkillHireling =
    'Inner Sight' | 'Fire Arrow' | 'Ice Arrow' | 'Jab' | 'Prayer' | 'Defiance' | 'Blessed Aim' | 'Thorns' |
    'Holy Freeze' | 'Might' | 'Inferno' | 'Fire Ball' | 'Glacial Spike' | 'Frozen Armor' | 'Charged Bolt' |
    'Lightning' | 'Ice Blast' | 'Bash' | 'Stun';

// noinspection TypeScriptDuplicateUnionOrIntersectionType
export type TSkillUi = 'Blank' | 'Attack' | 'Unsummon' | 'Throw' | null | 'Left Hand Swing' | 'Left Hand Throw' |
    'Scroll of Identify' | null | 'Scroll of Town Portal';
