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
            integerEffect: int
            // percentageEffect: pct,
            // rangeEffect: rng,
            // damageOverTimeEffect: dot
        } = EffectHelper;

        const { all, bows } = this;
        const runes = this.runes.bind(this);

        const runeWords: IRuneWordMap = {
            'Ancient\'s Pledge': {
                name: 'Ancient\'s Pledge',
                itemTypes: all('shield'),
                ...runes('Ral', 'Ort', 'Tal'),
                effects: []
            },
            Beast: {
                name: 'Beast',
                itemTypes: ['axe', 'hammer', 'scepter'],
                ...runes('Ber', 'Tir', 'Um', 'Mal', 'Lum'),
                effects: []
            },
            Black: {
                name: 'Black',
                itemTypes: ['club', 'mace', 'hammer'],
                ...runes('Thul', 'Io', 'Nef'),
                effects: []
            },
            Bone: {
                name: 'Bone',
                itemTypes: 'armorBody',
                ...runes('Sol', 'Um', 'Um'),
                effects: []
            },
            Bramble: {
                name: 'Bramble',
                itemTypes: 'armorBody',
                ...runes('Ral', 'Ohm', 'Sur', 'Eth'),
                effects: []
            },
            Brand: {
                name: 'Brand',
                itemTypes: bows,
                ...runes('Jah', 'Lo', 'Mal', 'Gul'),
                effects: []
            },
            'Breath of the Dying': {
                name: 'Breath of the Dying',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Vex', 'Hel', 'El', 'Eld', 'Zod', 'Eth'),
                effects: []
            },
            'Call to Arms': {
                name: 'Call to Arms',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Amn', 'Ral', 'Mal', 'Ist', 'Ohm'),
                effects: []
            },
            'Chains of Honor': {
                name: 'Chains of Honor',
                itemTypes: 'armorBody',
                ...runes('Dol', 'Um', 'Ber', 'Ist'),
                effects: []
            },
            Chaos: {
                name: 'Chaos',
                itemTypes: 'claw',
                ...runes('Fal', 'Ohm', 'Um'),
                effects: []
            },
            'Crescent Moon': {
                name: 'Crescent Moon',
                itemTypes: ['axe', 'poleArm', 'sword'],
                ...runes('Shael', 'Um', 'Tir'),
                effects: []
            },
            Death: {
                name: 'Death',
                itemTypes: ['sword', 'axe'],
                ...runes('Hel', 'El', 'Vex', 'Ort', 'Gul'),
                effects: []
            },
            Delirium: {
                name: 'Delirium',
                itemTypes: all('armorHead'),
                ...runes('Lem', 'Ist', 'Io'),
                effects: []
            },
            Destruction: {
                name: 'Destruction',
                itemTypes: ['poleArm', 'sword'],
                ...runes('Vex', 'Lo', 'Ber', 'Jah', 'Ko'),
                effects: []
            },
            Doom: {
                name: 'Doom',
                itemTypes: ['axe', 'hammer', 'poleArm'],
                ...runes('Hel', 'Ohm', 'Um', 'Lo', 'Cham'),
                effects: []
            },
            Dragon: {
                name: 'Dragon',
                itemTypes: all('armorBody', 'shield'),
                ...runes('Sur', 'Lo', 'Sol'),
                effects: []
            },
            Dream: {
                name: 'Dream',
                itemTypes: all('shield', 'armorHead'),
                ...runes('Io', 'Jah', 'Pul'),
                effects: []
            },
            Duress: {
                name: 'Duress',
                itemTypes: 'armorBody',
                ...runes('Shael', 'Um', 'Thul'),
                effects: []
            },
            Edge: {
                name: 'Edge',
                itemTypes: bows,
                ...runes('Tir', 'Tal', 'Amn'),
                effects: []
            },
            Enigma: {
                name: 'Enigma',
                itemTypes: 'armorBody',
                ...runes('Jah', 'Ith', 'Ber'),
                effects: []
            },
            Enlightenment: {
                name: 'Enlightenment',
                itemTypes: 'armorBody',
                ...runes('Pul', 'Ral', 'Sol'),
                effects: []
            },
            Eternity: {
                name: 'Eternity',
                itemTypes: all('weaponsMelee'),
                ...runes('Amn', 'Ber', 'Ist', 'Sol', 'Sur'),
                effects: []
            },
            Exile: {
                name: 'Exile',
                itemTypes: 'paladinShield',
                ...runes('Vex', 'Ohm', 'Ist', 'Dol'),
                effects: []
            },
            Faith: {
                name: 'Faith',
                itemTypes: bows,
                ...runes('Ohm', 'Jah', 'Lem', 'Eld'),
                effects: []
            },
            Famine: {
                name: 'Famine',
                itemTypes: ['axe', 'hammer'],
                ...runes('Fal', 'Ohm', 'Ort', 'Jah'),
                effects: []
            },
            Fortitude: {
                name: 'Fortitude',
                itemTypes: all('weaponsRanged', 'weaponsMelee', 'armorBody'),
                ...runes('El', 'Sol', 'Dol', 'Lo'),
                effects: []
            },
            Fury: {
                name: 'Fury',
                itemTypes: all('weaponsMelee'),
                ...runes('Jah', 'Gul', 'Eth'),
                effects: []
            },
            Gloom: {
                name: 'Gloom',
                itemTypes: 'armorBody',
                ...runes('Fal', 'Um', 'Pul'),
                effects: []
            },
            Grief: {
                name: 'Grief',
                itemTypes: ['sword', 'axe'],
                ...runes('Eth', 'Tir', 'Lo', 'Mal', 'Ral'),
                effects: []
            },
            'Hand of Justice': {
                name: 'Hand of Justice',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Sur', 'Cham', 'Amn', 'Lo'),
                effects: []
            },
            Harmony: {
                name: 'Harmony',
                itemTypes: bows,
                ...runes('Tir', 'Ith', 'Sol', 'Ko'),
                effects: []
            },
            'Heart of the Oak': {
                name: 'Heart of the Oak',
                itemTypes: ['stave', 'mace'],
                ...runes('Ko', 'Vex', 'Pul', 'Thul'),
                effects: []
            },
            'Holy Thunder': {
                name: 'Holy Thunder',
                itemTypes: 'scepter',
                ...runes('Eth', 'Ral', 'Ort', 'Tal'),
                effects: []
            },
            Honor: {
                name: 'Honor',
                itemTypes: 'weaponsMelee',
                ...runes('Amn', 'El', 'Ith', 'Tir', 'Sol'),
                effects: []
            },
            Ice: {
                name: 'Ice',
                itemTypes: bows,
                ...runes('Amn', 'Shael', 'Jah', 'Lo'),
                effects: []
            },
            Infinity: {
                name: 'Infinity',
                itemTypes: 'poleArm',
                ...runes('Ber', 'Mal', 'Ber', 'Ist'),
                effects: []
            },
            Insight: {
                name: 'Insight',
                itemTypes: ['poleArm', 'stave'],
                ...runes('Ral', 'Tir', 'Tal', 'Sol'),
                effects: []
            },
            'King\'s Grace': {
                name: 'King\'s Grace',
                itemTypes: ['sword', 'scepter'],
                ...runes('Amn', 'Ral', 'Thul'),
                effects: []
            },
            Kingslayer: {
                name: 'Kingslayer',
                itemTypes: ['sword', 'axe'],
                ...runes('Mal', 'Um', 'Gul', 'Fal'),
                effects: []
            },
            'Last Wish': {
                name: 'Last Wish',
                itemTypes: ['axe', 'hammer', 'sword'],
                ...runes('Jah', 'Mal', 'Jah', 'Sur', 'Jah', 'Ber'),
                effects: []
            },
            Lawbringer: {
                name: 'Lawbringer',
                itemTypes: ['hammer', 'scepter', 'sword'],
                ...runes('Amn', 'Lem', 'Ko'),
                effects: []
            },
            Leaf: {
                name: 'Leaf',
                itemTypes: 'stave',
                ...runes('Tir', 'Ral'),
                effects: []
            },
            Lionheart: {
                name: 'Lionheart',
                itemTypes: 'armorBody',
                ...runes('Hel', 'Lum', 'Fal'),
                effects: []
            },
            Lore: {
                name: 'Lore',
                itemTypes: all('armorHead'),
                ...runes('Ort', 'Sol'),
                effects: []
            },
            Malice: {
                name: 'Malice',
                itemTypes: all('weaponsMelee'),
                ...runes('Ith', 'El', 'Eth'),
                effects: []
            },
            Melody: {
                name: 'Melody',
                itemTypes: bows,
                ...runes('Shael', 'Ko', 'Nef'),
                effects: []
            },
            Memory: {
                name: 'Memory',
                itemTypes: 'stave',
                ...runes('Lum', 'Io', 'Sol', 'Eth'),
                effects: []
            },
            Myth: {
                name: 'Myth',
                itemTypes: 'armorBody',
                ...runes('Hel', 'Amn', 'Nef'),
                effects: []
            },
            Nadir: {
                name: 'Nadir',
                itemTypes: all('armorHead'),
                ...runes('Nef', 'Tir'),
                effects: []
            },
            Oath: {
                name: 'Oath',
                itemTypes: ['axe', 'mace', 'sword'],
                ...runes('Shael', 'Pul', 'Mal', 'Lum'),
                effects: []
            },
            Obedience: {
                name: 'Obedience',
                itemTypes: 'poleArm',
                ...runes('Hel', 'Ko', 'Thul', 'Eth', 'Fal'),
                effects: []
            },
            Passion: {
                name: 'Passion',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Dol', 'Ort', 'Eld', 'Lem'),
                effects: []
            },
            Peace: {
                name: 'Peace',
                itemTypes: 'armorBody',
                ...runes('Shael', 'Thul', 'Amn'),
                effects: []
            },
            Phoenix: {
                name: 'Phoenix',
                itemTypes: all('weaponsRanged', 'weaponsMelee', 'shield'),
                ...runes('Vex', 'Vex', 'Lo', 'Jah'),
                effects: []
            },
            Pride: {
                name: 'Pride',
                itemTypes: 'poleArm',
                ...runes('Cham', 'Sur', 'Io', 'Lo'),
                effects: []
            },
            Principle: {
                name: 'Principle',
                itemTypes: 'armorBody',
                ...runes('Ral', 'Gul', 'Eld'),
                effects: []
            },
            Prudence: {
                name: 'Prudence',
                itemTypes: 'armorBody',
                ...runes('Mal', 'Tir'),
                effects: []
            },
            Radiance: {
                name: 'Radiance',
                itemTypes: all('armorHead'),
                ...runes('Nef', 'Sol', 'Ith'),
                effects: []
            },
            Rain: {
                name: 'Rain',
                itemTypes: 'armorBody',
                ...runes('Ort', 'Mal', 'Ith'),
                effects: []
            },
            Rhyme: {
                name: 'Rhyme',
                itemTypes: all('shield'),
                ...runes('Shael', 'Eth'),
                effects: []
            },
            Rift: {
                name: 'Rift',
                itemTypes: ['poleArm', 'scepter'],
                ...runes('Hel', 'Ko', 'Lem', 'Gul'),
                effects: []
            },
            Sanctuary: {
                name: 'Sanctuary',
                itemTypes: 'shield',
                ...runes('Ko', 'Ko', 'Mal'),
                effects: []
            },
            Silence: {
                name: 'Silence',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Dol', 'Eld', 'Hel', 'Ist', 'Tir', 'Vex'),
                effects: []
            },
            Smoke: {
                name: 'Smoke',
                itemTypes: 'armorBody',
                ...runes('Nef', 'Lum'),
                effects: []
            },
            Spirit: {
                name: 'Spirit',
                itemTypes: ['sword', 'shield'],
                ...runes('Tal', 'Thul', 'Ort', 'Amn'),
                effects: []
            },
            Splendor: {
                name: 'Splendor',
                itemTypes: 'shield',
                ...runes('Eth', 'Lum'),
                effects: []
            },
            Stealth: {
                name: 'Stealth',
                itemTypes: 'armorBody',
                ...runes('Tal', 'Eth'),
                effects: []
            },
            Steel: {
                name: 'Steel',
                itemTypes: ['sword', 'axe', 'mace'],
                ...runes('Tir', 'El'),
                effects: []
            },
            Stone: {
                name: 'Stone',
                itemTypes: 'armorBody',
                ...runes('Shael', 'Um', 'Pul', 'Lum'),
                effects: []
            },
            Strength: {
                name: 'Strength',
                itemTypes: all('weaponsMelee'),
                ...runes('Amn', 'Tir'),
                effects: []
            },
            Treachery: {
                name: 'Treachery',
                itemTypes: 'armorBody',
                ...runes('Shael', 'Thul', 'Lem'),
                effects: []
            },
            Venom: {
                name: 'Venom',
                itemTypes: all('weaponsRanged', 'weaponsMelee'),
                ...runes('Tal', 'Dol', 'Mal'),
                effects: []
            },
            'Voice of Reason': {
                name: 'Voice of Reason',
                itemTypes: ['mace', 'sword'],
                ...runes('Lem', 'Ko', 'El', 'Eld'),
                effects: []
            },
            Wealth: {
                name: 'Wealth',
                itemTypes: 'armorBody',
                ...runes('Lem', 'Ko', 'Tir'),
                effects: []
            },
            White: {
                name: 'White',
                itemTypes: 'wand',
                ...runes('Dol', 'Io'),
                effects: [
                    //int('AttackRating', 50),
                    int('StatVitality', 10),
                    int('StatMana', 13),
                    int('ReduceDamageMagic', 13)
                ]
            },
            Wind: {
                name: 'Wind',
                itemTypes: all('weaponsMelee'),
                ...runes('Sur', 'El'),
                effects: []
            },
            Wrath: {
                name: 'Wrath',
                itemTypes: bows,
                ...runes('Pul', 'Lum', 'Ber', 'Mal'),
                effects: []
            },
            Zephyr: {
                name: 'Zephyr',
                itemTypes: bows,
                ...runes('Ort', 'Eth'),
                effects: []
            }
        };

        ObjectHelper.forEach(
            runeWords,
            (key, runeWord) =>
                runeWord.owned = owned[runeWord.name]);

        return runeWords;
    }
}
