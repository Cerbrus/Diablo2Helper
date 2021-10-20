import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EffectHelper, EffectRowConfig, GemHelper, RuneHelper } from '~helpers';
import { IGem } from '~interfaces/gem';
import { IRune } from '~interfaces/rune';
import { TGem } from '~types/gem';
import { TRune } from '~types/rune';
import { TooltipBaseDirective } from '../tooltip-base/tooltip-base';

@Directive({
    selector: '[tooltipSocketable]'
})
export class TooltipSocketableDirective extends TooltipBaseDirective {
    @Input('tooltipSocketable')
    public socketable!: TGem | IGem | TRune | IRune;

    constructor(
        elementRef: ElementRef,
        renderer: Renderer2,
        @Inject(DOCUMENT) document: Document,
        private readonly translate: TranslateService,
        private readonly runeHelper: RuneHelper,
        private readonly gemHelper: GemHelper,
        private readonly effectHelper: EffectHelper
    ) {
        super('tooltip-socketable', elementRef, renderer, document);
    }

    protected buildHtml(): void {
        const item = this.getRuneOrGem();
        if (!item) return;

        const { cLvl, name } = item;
        const isRune = this.runeHelper.isItem(item);

        const title = isRune ? this.translate.instant(`runes.title`, { name }) : name;

        this.appendRow(title, 'title', isRune ? 'title-rune' : 'title-gem')
            .appendRow(this.translate.instant('tooltip.canBeInsertedIntoSocket'))
            .lineBreak();

        this.effectHelper.effectRows.forEach(this.buildEffectRow.bind(this), this);

        if (cLvl > 1) this.lineBreak().appendRow(this.translate.instant('tooltip.lvlRequirement', { cLvl }));
    }

    private getRuneOrGem(): IRune | IGem {
        const { runeHelper: rune, gemHelper: gem, socketable: item } = this;

        return rune.isType(item) ? rune.getItem(item) : gem.isType(item) ? gem.getItem(item) : item;
    }

    private buildEffectRow({ title, key }: EffectRowConfig): void {
        const effect = this.getRuneOrGem()?.effects[key];
        if (!effect) return;

        const effectString = this.effectHelper.formatEffects(effect);
        const row = this.translate.instant(`tooltip.${title}`, { effect: effectString });

        this.appendRow(row);
    }
}
