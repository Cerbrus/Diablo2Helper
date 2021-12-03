import { Injectable } from '@angular/core';
import { BaseEntityFactory } from '~factories/base-entity.factory';
import { ObjectHelper } from '~helpers';
import { ISkillMap } from '~interfaces/player';
import { Skills } from '~types/player';

@Injectable({ providedIn: 'root' })
export class SkillFactory extends BaseEntityFactory<ISkillMap> {
    public buildItems(): ISkillMap {
        const skills: ISkillMap = {
            amazon: [
                {
                    name: 'Javelin and Spear',
                    skills: [
                        { tier: 1, position: 0, name: 'Jab' },
                        { tier: 2, position: 1, name: 'Power Strike' },
                        { tier: 2, position: 2, name: 'Poison Javelin' },
                        { tier: 3, position: 0, name: 'Impale' },
                        { tier: 3, position: 2, name: 'Lightning Bolt' },
                        { tier: 4, position: 1, name: 'Charged Strike' },
                        { tier: 4, position: 2, name: 'Plague Javelin' },
                        { tier: 5, position: 0, name: 'Fend' },
                        { tier: 6, position: 1, name: 'Lightning Strike' },
                        { tier: 6, position: 2, name: 'Lightning Fury' }
                    ]
                },
                {
                    name: 'Passive and Magic',
                    skills: [
                        { tier: 1, position: 0, name: 'Inner Sight' },
                        { tier: 1, position: 2, name: 'Critical Strike' },
                        { tier: 2, position: 1, name: 'Dodge' },
                        { tier: 3, position: 0, name: 'Slow Missiles' },
                        { tier: 3, position: 1, name: 'Avoid' },
                        { tier: 4, position: 2, name: 'Penetrate' },
                        { tier: 5, position: 0, name: 'Decoy' },
                        { tier: 5, position: 1, name: 'Evade' },
                        { tier: 6, position: 0, name: 'Valkyrie' },
                        { tier: 6, position: 2, name: 'Pierce' }
                    ]
                },
                {
                    name: 'Bow and Crossbow',
                    skills: [
                        { tier: 1, position: 1, name: 'Magic Arrow' },
                        { tier: 1, position: 2, name: 'Fire Arrow' },
                        { tier: 2, position: 0, name: 'Cold Arrow' },
                        { tier: 2, position: 1, name: 'Multiple Shot' },
                        { tier: 3, position: 2, name: 'Exploding Arrow' },
                        { tier: 4, position: 0, name: 'Ice Arrow' },
                        { tier: 4, position: 1, name: 'Guided Arrow' },
                        { tier: 5, position: 2, name: 'Strafe' },
                        { tier: 5, position: 1, name: 'Immolation Arrow' },
                        { tier: 6, position: 0, name: 'Freezing Arrow' }
                    ]
                }
            ],
            assassin: [
                { name: '', skills: [] },
                { name: '', skills: [] },
                { name: '', skills: [] }
            ],
            barbarian: [
                { name: '', skills: [] },
                { name: '', skills: [] },
                { name: '', skills: [] }
            ],
            druid: [
                { name: '', skills: [] },
                { name: '', skills: [] },
                { name: '', skills: [] }
            ],
            necromancer: [
                { name: '', skills: [] },
                { name: '', skills: [] },
                { name: '', skills: [] }
            ],
            paladin: [
                { name: '', skills: [] },
                { name: '', skills: [] },
                { name: '', skills: [] }
            ],
            sorceress: [
                { name: '', skills: [] },
                { name: '', skills: [] },
                { name: '', skills: [] }
            ]
        };

        ObjectHelper.forEach(skills, (className, trees) => {
            trees
                .map(t => t.skills)
                .flat()
                .forEach(skill => {
                    skill.index = (<Array<string>>(<unknown>Skills[className])).indexOf(skill.name);
                });
        });

        return <ISkillMap>(<any>skills);
    }
}
