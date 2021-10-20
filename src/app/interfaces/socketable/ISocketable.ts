import { Optional } from '~types/helpers';
import { ISocketableEffects } from '.';

export interface ISocketable<T extends 'Gem' | 'Rune'> {
    name: string;
    cLvl: number;
    effects: Optional<ISocketableEffects, 'shield'>;
}
