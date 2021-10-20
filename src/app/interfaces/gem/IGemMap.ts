import { TGemQuality, TGemType } from '~types/gem';
import { IGem } from '.';

export interface IGemMap extends TGemMap {}

export type TGemQualityMap<T> = {
    [gemQuality in TGemQuality]: T;
};

export type TGemMap = {
    [gemType in TGemType]: {
        [gemQuality in TGemQuality]: IGem & {
            type: gemType;
            quality: gemQuality;
        };
    };
};
