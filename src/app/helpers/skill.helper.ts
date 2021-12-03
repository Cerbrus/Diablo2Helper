import { Injectable } from '@angular/core';
import { IItem } from '@dschu012/d2s/lib/d2/types';
import { SkillFactory } from '~factories/skill.factory';
import { BaseEntitiesHelper } from '~helpers/base-entities.helper';
import { IClassSkill, ISkillMap } from '~interfaces/player';
import { ITable } from '~interfaces/ui';
import { Classes, TSkill, TSkillSort } from '~types/player';

@Injectable({ providedIn: 'root' })
export class SkillHelper extends BaseEntitiesHelper<ISkillMap, TSkill, IClassSkill<any>, TSkillSort> {
    constructor(skillFactory: SkillFactory) {
        super(skillFactory);
    }

    public static getType(item: TSkill | IClassSkill<any>): TSkill {
        return typeof item === 'string' ? item : item.name;
    }

    public fromSaveItem(item: IItem): IClassSkill<any> | null {
        return null;
    }

    public getItem<TClass extends typeof Classes[number]>(item: TSkill): IClassSkill<TClass> {
        return this.itemsArray.find(skill => skill.name === item)!;
    }

    public getType(item: TSkill | IClassSkill<any>): TSkill {
        return SkillHelper.getType(item);
    }

    public isItem<T, TClass extends typeof Classes[number]>(item: any): item is IClassSkill<TClass> {
        return typeof item !== 'string' && 'tier' in item;
    }

    public isType(item: any): item is TSkill {
        return typeof item === 'string';
    }

    public saveEntitiesOwned(): void {}

    protected applySort(changedSort: ITable<any> | undefined): void {}
}
