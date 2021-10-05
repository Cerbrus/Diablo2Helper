import { IGem } from '.';
import { TGemQuality, TGemType } from '../../types/gem';

export interface IGemMap extends TGemMap {
}

export type TGemQualityMap<T> = {
    [gemQuality in TGemQuality]: T;
};

export type TGemMap = {
    [gemType in TGemType]: {
        [gemQuality in TGemQuality]: IGem &
        {
            type: gemType;
            quality: gemQuality;
        };
    };
};
