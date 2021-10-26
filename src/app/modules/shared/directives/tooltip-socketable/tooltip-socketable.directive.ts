import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EffectHelper, GemHelper, RuneHelper } from '~helpers';
import { IGem } from '~interfaces/gem';
import { IRune } from '~interfaces/rune';
import { PopupService } from '~modules/shared/services/popup.service';
import { TEffectRowConfig } from '~types/effect';
import { TGem } from '~types/gem';
import { TRune } from '~types/rune';
import { TooltipBaseDirective } from '../tooltip-base/tooltip-base';

@Directive({ selector: '[tooltipSocketable]' })
export class TooltipSocketableDirective extends TooltipBaseDirective {
    @Input('tooltipSocketable')
    public socketable!: TGem | IGem | TRune | IRune;

    constructor(
        elementRef: ElementRef,
        popupService: PopupService,
        @Inject(DOCUMENT) document: Document,
        private readonly effectHelper: EffectHelper,
        private readonly gemHelper: GemHelper,
        private readonly runeHelper: RuneHelper,
        private readonly translate: TranslateService
    ) {
        super('tooltip-socketable', popupService, elementRef);
    }

    protected buildHtml(): void {
        const item = this.getRuneOrGem();
        if (!item) return;

        const { cLvl, name } = item;
        const isRune = this.runeHelper.isItem(item);

        const title = isRune ? this.translate.instant(`runes.title`, { name }) : name;

        this.popup
            .appendRow(title, 'title', isRune ? 'title-rune' : 'title-gem')
            .appendRow(this.translate.instant('tooltip.canBeInsertedIntoSocket'))
            .lineBreak()
            .endUsing();

        this.effectHelper.effectRows.forEach(this.buildEffectRow.bind(this), this);

        if (cLvl > 1)
            this.popup.lineBreak().appendRow(this.translate.instant('tooltip.lvlRequirement', { cLvl })).endUsing();
    }

    private getRuneOrGem(): IRune | IGem {
        const { runeHelper: rune, gemHelper: gem, socketable: item } = this;

        return rune.isType(item) ? rune.getItem(item) : gem.isType(item) ? gem.getItem(item) : item;
    }

    private buildEffectRow({ title, key }: TEffectRowConfig): void {
        const effect = this.getRuneOrGem()?.effects[key];
        if (!effect) return;

        const effectString = this.effectHelper.formatEffects(effect);
        const row = this.translate.instant(`tooltip.${title}`, { effect: effectString });

        this.popup.appendRow(row).endUsing();
    }
}
