import { IGem } from '.';
import { TGemType } from '~types/gem';

export interface IGemType {
    type: TGemType;
    gems: Array<IGem>;
}
