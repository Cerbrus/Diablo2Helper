import { TProgression } from '../../types/saveFile';

export class ProgressionParser {
    public static parse(progression: number, isExpansion: boolean): TProgression {
        return {
            normal: {
                andariel: progression >= 1,
                duriel: progression >= 2,
                mephisto: progression >= 3,
                diablo: progression >= 4,
                baal: (isExpansion ? progression >= 5 : false)
            },
            nightmare: {
                andariel: progression >= (isExpansion ? 5 : 6),
                duriel: progression >= (isExpansion ? 6 : 7),
                mephisto: progression >= (isExpansion ? 7 : 8),
                diablo: progression >= (isExpansion ? 8 : 9),
                baal: (isExpansion ? progression >= 10 : false)
            },
            hell: {
                andariel: progression >= (isExpansion ? 9 : 11),
                duriel: progression >= (isExpansion ? 10 : 12),
                mephisto: progression >= (isExpansion ? 11 : 13),
                diablo: progression >= (isExpansion ? 12 : 14),
                baal: (isExpansion ? progression >= 15 : false)
            }
        };
    }
}
