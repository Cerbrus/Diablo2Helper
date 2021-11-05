import { Component, HostBinding, Input } from '@angular/core';
import { BaseEntitiesHelper } from '~helpers';
import { IGem } from '~interfaces/gem';
import { IRune } from '~interfaces/rune';
import { TGem } from '~types/gem';
import { TRune } from '~types/rune';
import { SpriteBaseComponent } from './sprite-base.component';

@Component({ template: '' })
export abstract class SpriteSocketableBaseComponent<
    TItemType extends TGem | TRune,
    TItem extends IGem | IRune
> extends SpriteBaseComponent {
    public entity!: TItem;

    @Input()
    public set item(gem: TItem | TItemType) {
        this.entity = this.helper.asItem(gem);
    }

    @Input()
    public highlightOwned: boolean | number = false;

    @HostBinding('class.owned')
    public get cssClass(): boolean {
        const owned = this.entity?.owned ?? 0;
        return typeof this.highlightOwned === 'number'
            ? owned >= this.highlightOwned
            : this.highlightOwned && owned > 0;
    }

    protected constructor(private readonly helper: BaseEntitiesHelper<any, TItemType, TItem, any>) {
        super();
    }
}
