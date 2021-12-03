import { IClassSkill } from '~interfaces/player';
import { ITable } from '~interfaces/ui';

export type TSkillSortKeys = 'type' | 'quality';
export type TSkillSort = Record<TSkillSortKeys, ITable<IClassSkill<any>>>;
