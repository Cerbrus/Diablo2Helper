import { TGemQuality, TGemType } from '../../types/gem';
import { ISocketable, ISocketableEffects } from '../socketable';

export interface IGem extends ISocketable<'Gem'> {
    type: TGemType;
    quality: TGemQuality;
    name: string;
    effects: ISocketableEffects;
    owned?: number;
}
