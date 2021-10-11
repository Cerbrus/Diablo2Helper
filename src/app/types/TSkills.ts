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
        'Fire Blast', 'Shock Web', 'Blade Sentinel', 'Charged Bolt Sentry', 'Wake of Fire', 'Blade Fury',
        'Lightning Sentry', 'Wake of Inferno', 'Death Sentry', 'Blade Shield', 'Claw Mastery', 'Psychic Hammer',
        'Cloak of Shadows', 'Weapon Block', 'Venom', 'Fade', 'Shadow Master', 'Mind Blast', 'Burst of Speed',
        'Shadow Warrior', 'Tiger Strike', 'Dragon Talon', 'Fists of Fire', 'Dragon Claw', 'Dragon Tail', 'Cobra Strike',
        'Blades of Ice', 'Dragon Flight', 'Phoenix Strike', 'Claws of Thunder'

    ],
    barbarian: [
        'Bash', 'Sword Mastery', 'Axe Mastery', 'Mace Mastery', 'Howl', 'Find Potion', 'Leap', 'Double Swing',
        'Pole Arm Mastery', 'Throwing Mastery', 'Spear Mastery', 'Taunt', 'Shout', 'Stun', 'Double Throw',
        'Increased Stamina', 'Find Item', 'Leap Attack', 'Concentrate', 'Iron Skin', 'Battle Cry', 'Frenzy',
        'Increased Speed', 'Battle Orders', 'Grim Ward', 'Whirlwind', 'Berserk', 'Natural Resistance', 'War Cry',
        'Battle Command'
    ],
    druid: [
        'Raven', 'Poison Creeper', 'Spirit of Barbs', 'Summon Spirit Wolf', 'Carrion Vine', 'Heart of Wolverine',
        'Summon Dire Wolf', 'Solar Creeper', 'Oak Sage', 'Summon Grizzly', 'Werewolf', 'Werebear', 'Rabies',
        'Fire Claws', 'Shock Wave', 'Fury', 'Firestorm', 'Molten Boulder', 'Arctic Blast', 'Fissure', 'Cyclone Armor',
        'Twister', 'Volcano', 'Tornado', 'Hurricane', 'Armageddon', 'Lycanthropy', 'Feral Rage', 'Maul', 'Hunger'
    ],
    necromancer: [
        'Amplify Damage', 'Teeth', 'Bone Armor', 'Skeleton Mastery', 'Raise Skeleton', 'Dim Vision', 'Weaken',
        'Poison Dagger', 'Corpse Explosion', 'Clay Golem', 'Iron Maiden', 'Terror', 'Bone Wall', 'Golem Mastery',
        'Raise Skeletal Mage', 'Confuse', 'Life Tap', 'Poison Explosion', 'Bone Spear', 'Blood Golem', 'Attract',
        'Decrepify', 'Bone Prison', 'Summon Resist', 'Iron Golem', 'Lower Resist', 'Poison Nova', 'Bone Spirit',
        'Fire Golem', 'Revive'
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

export const SkillsAll = [
    ...SkillsUi.amazon,
    ...SkillsUi.assassin,
    ...SkillsUi.barbarian,
    ...SkillsUi.druid,
    ...SkillsUi.necromancer,
    ...SkillsUi.paladin,
    ...SkillsUi.sorceress
];

export const SkillsAllUi = [
    ...SkillsAll,
    ...SkillsUi.hireling,
    ...SkillsUi.ui
];

export type TSkillAmazon =
    'Magic Arrow' | 'Fire Arrow' | 'Inner Sight' | 'Critical Strike' | 'Jab' | 'Cold Arrow' | 'Multiple Shot' |
    'Dodge' | 'Power Strike' | 'Poison Javelin' | 'Exploding Arrow' | 'Slow Missiles' | 'Avoid' | 'Impale' |
    'Lightning Bolt' | 'Ice Arrow' | 'Guided Arrow' | 'Penetrate' | 'Charged Strike' | 'Plague Javelin' |
    'Strafe' | 'Immolation Arrow' | 'Dopplezon' | 'Evade' | 'Fend' | 'Freezing Arrow' | 'Valkyrie' | 'Pierce' |
    'Lightning Strike' | 'Lightning Fury';

export type TSkillAssassin =
    'Fire Blast' | 'Shock Web' | 'Blade Sentinel' | 'Charged Bolt Sentry' | 'Wake of Fire' | 'Blade Fury' |
    'Lightning Sentry' | 'Wake of Inferno' | 'Death Sentry' | 'Blade Shield' | 'Claw Mastery' | 'Psychic Hammer' |
    'Cloak of Shadows' | 'Weapon Block' | 'Venom' | 'Fade' | 'Shadow Master' | 'Mind Blast' | 'Burst of Speed' |
    'Shadow Warrior' | 'Tiger Strike' | 'Dragon Talon' | 'Fists of Fire' | 'Dragon Claw' | 'Dragon Tail' |
    'Cobra Strike' | 'Blades of Ice' | 'Dragon Flight' | 'Phoenix Strike' | 'Claws of Thunder';

export type TSkillBarbarian =
    'Bash' | 'Sword Mastery' | 'Axe Mastery' | 'Mace Mastery' | 'Howl' | 'Find Potion' | 'Leap' | 'Double Swing' |
    'Pole Arm Mastery' | 'Throwing Mastery' | 'Spear Mastery' | 'Taunt' | 'Shout' | 'Stun' | 'Double Throw' |
    'Increased Stamina' | 'Find Item' | 'Leap Attack' | 'Concentrate' | 'Iron Skin' | 'Battle Cry' | 'Frenzy' |
    'Increased Speed' | 'Battle Orders' | 'Grim Ward' | 'Whirlwind' | 'Berserk' | 'Natural Resistance' | 'War Cry' |
    'Battle Command';

export type TSkillDruid =
    'Raven' | 'Poison Creeper' | 'Spirit of Barbs' | 'Summon Spirit Wolf' | 'Carrion Vine' | 'Heart of Wolverine' |
    'Summon Dire Wolf' | 'Solar Creeper' | 'Oak Sage' | 'Summon Grizzly' | 'Werewolf' | 'Werebear' | 'Rabies' |
    'Fire Claws' | 'Shock Wave' | 'Fury' | 'Firestorm' | 'Molten Boulder' | 'Arctic Blast' | 'Fissure' |
    'Cyclone Armor' | 'Twister' | 'Volcano' | 'Tornado' | 'Hurricane' | 'Armageddon' | 'Lycanthropy' | 'Feral Rage' |
    'Maul' | 'Hunger';

export type TSkillNecromancer =
    'Amplify Damage' | 'Teeth' | 'Bone Armor' | 'Skeleton Mastery' | 'Raise Skeleton' | 'Dim Vision' | 'Weaken' |
    'Poison Dagger' | 'Corpse Explosion' | 'Clay Golem' | 'Iron Maiden' | 'Terror' | 'Bone Wall' | 'Golem Mastery' |
    'Raise Skeletal Mage' | 'Confuse' | 'Life Tap' | 'Poison Explosion' | 'Bone Spear' | 'Blood Golem' | 'Attract' |
    'Decrepify' | 'Bone Prison' | 'Summon Resist' | 'Iron Golem' | 'Lower Resist' | 'Poison Nova' | 'Bone Spirit' |
    'Fire Golem' | 'Revive';

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

