import { ISocketableEffects } from '.';
import { Optional } from '../../types/helpers';

export interface ISocketable<T extends 'Gem' | 'Rune'> {
    name: string;
    cLvl: number;
    effects: Optional<ISocketableEffects, 'shield'>;
}
