import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EffectHelper } from '~helpers';
import { IEffectBuilderParams, IEffectBuilders } from '~interfaces/effect';
import { IGem, IGemMap, TGemQualityMap } from '~interfaces/gem';
import { ISocketableEffects } from '~interfaces/socketable';
import { StorageService } from '~services';
import { GemQualities, GemQualityMap, TGem, TGemQuality, TGemType } from '~types/gem';
import { BaseEntityFactory } from './base-entity.factory';

@Injectable({ providedIn: 'root' })
export class GemFactory extends BaseEntityFactory<IGemMap> {
    private readonly qualityLevels: TGemQualityMap<number> = {
        chipped: 1,
        flawed: 5,
        normal: 12,
        flawless: 15,
        perfect: 18
    };

    constructor(private readonly storageService: StorageService, private readonly translate: TranslateService) {
        super();
    }

    public buildItems(): IGemMap {
        const owned = this.storageService.get.gemsOwned();
        const effect = EffectHelper.effect;
        const $ = (a: number, b: number) => [a, b];

        return {
            amethyst: this.buildGemQualities(
                'amethyst',
                owned,
                {
                    weapon: value => effect('stat.attackRating', `+${value}`),
                    armorHelm: value => effect('stat.strength', `+${value}`),
                    shield: value => effect('stat.defense', `+${value}`)
                },
                {
                    weapon: [40, 60, 80, 100, 150],
                    armorHelm: [3, 4, 6, 8, 10],
                    shield: [8, 12, 18, 24, 30]
                }
            ),
            diamond: this.buildGemQualities(
                'diamond',
                owned,
                {
                    weapon: value => effect('damage.undead', `+${value}%`),
                    armorHelm: value => effect('stat.attackRating', `+${value}`),
                    shield: value => effect('resist.all', `+${value}%`)
                },
                {
                    weapon: [28, 34, 44, 54, 68],
                    armorHelm: [20, 40, 60, 80, 100],
                    shield: [6, 8, 11, 14, 19]
                }
            ),
            emerald: this.buildGemQualities(
                'emerald',
                owned,
                {
                    weapon: ([value, duration]) => effect('damage.poison', `+${value}`, { duration }),
                    armorHelm: value => effect('stat.dexterity', `+${value}`),
                    shield: value => effect('resist.poison', `+${value}%`)
                },
                {
                    weapon: [$(10, 3), $(20, 4), $(40, 5), $(60, 6), $(100, 7)],
                    armorHelm: [3, 4, 6, 8, 10],
                    shield: [12, 16, 22, 28, 40]
                }
            ),
            ruby: this.buildGemQualities(
                'ruby',
                owned,
                {
                    weapon: ([min, max]) => effect('damage.fire', `+${min}-${max}`),
                    armorHelm: value => effect('stat.life', `+${value}`),
                    shield: value => effect('resist.fire', `+${value}%`)
                },
                {
                    weapon: [$(3, 4), $(5, 8), $(8, 12), $(10, 16), $(15, 20)],
                    armorHelm: [10, 17, 24, 31, 38],
                    shield: [12, 16, 22, 28, 40]
                }
            ),
            sapphire: this.buildGemQualities(
                'sapphire',
                owned,
                {
                    weapon: ([min, max]) => effect('damage.cold', `+${min}-${max}`),
                    armorHelm: value => effect('stat.mana', `+${value}`),
                    shield: value => effect('resist.cold', `+${value}%`)
                },
                {
                    weapon: [$(1, 3), $(3, 5), $(4, 7), $(6, 10), $(10, 14)],
                    armorHelm: [10, 17, 24, 31, 38],
                    shield: [12, 16, 22, 28, 40]
                }
            ),
            topaz: this.buildGemQualities(
                'topaz',
                owned,
                {
                    weapon: ([min, max]) => effect('damage.lightning', `${min}-${max}`),
                    armorHelm: value => effect('effect.MF', `+${value}%`),
                    shield: value => effect('resist.lightning', `+${value}%`)
                },
                {
                    weapon: [[1 - 8], [1 - 14], [1 - 22], [1 - 30], [1 - 40]],
                    armorHelm: [9, 13, 16, 20, 24],
                    shield: [12, 16, 22, 28, 40]
                }
            ),
            skull: this.buildGemQualities(
                'skull',
                owned,
                {
                    weapon: ([life, mana]) => [
                        effect('on.hit.stealLife', `${life}%`),
                        effect('on.hit.stealMana', `${mana}%`)
                    ],
                    armorHelm: ([life, mana]) => [
                        effect('effect.replenishLife', `+${life}`),
                        effect('effect.replenishMana', `${mana}%`)
                    ],
                    shield: value => effect('effect.thorns', value)
                },
                {
                    weapon: [$(2, 1), $(2, 2), $(3, 2), $(3, 3), $(4, 3)],
                    armorHelm: [$(2, 8), $(3, 8), $(3, 12), $(4, 12), $(5, 19)],
                    shield: [4, 8, 12, 16, 20]
                }
            )
        };
    }

    private setNewGemName<TGem extends IGem>(gem: TGem): TGem {
        const qualityKey = `gems.quality.${gem.quality}`;
        const typeKey = `gems.type.${gem.type}`;

        this.translate.get([qualityKey, typeKey]).subscribe(result => {
            gem.name = `${result[qualityKey]} ${result[typeKey]}`;
        });

        return gem;
    }

    public buildGem<TType extends TGemType, TQuality extends TGemQuality>(
        quality: TQuality,
        type: TType,
        owned: number,
        effects: ISocketableEffects
    ): IGem & { type: TType; quality: TQuality } {
        return this.setNewGemName({
            type,
            quality,
            owned,
            name: '',
            cLvl: this.qualityLevels[quality],
            effects
        });
    }

    private buildGemQualities<TType extends TGemType, W, A, S>(
        type: TType,
        owned: Partial<Record<TGem, number>>,
        builders: IEffectBuilders<W, A, S>,
        { weapon, armorHelm, shield }: IEffectBuilderParams<W, A, S>
    ): GemQualityMap<TType> {
        return GemQualities.reduce((gems, quality, index) => {
            const key: TGem = `${quality}|${type}`;
            return {
                ...gems,
                [quality]: this.buildGem(quality, type, owned[key] ?? 0, {
                    weapon: builders.weapon(weapon[index]),
                    armorHelm: builders.armorHelm(armorHelm[index]),
                    shield: builders.shield(shield[index])
                })
            };
        }, <GemQualityMap<TType>>{});
    }
}
