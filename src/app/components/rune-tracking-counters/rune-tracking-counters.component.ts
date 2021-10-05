import { Component, EventEmitter, Output } from '@angular/core';
import { RuneHelper } from '../../helpers';
import { IRune } from '../../interfaces/rune';
import { Runes, TRune } from '../../types/rune';

@Component({
    selector: 'rune-tracking-counters',
    templateUrl: './rune-tracking-counters.component.html',
    styleUrls: ['./rune-tracking-counters.component.scss']
})
export class RuneTrackingCountersComponent {
    public runes = Runes;

    @Output()
    public onChange: EventEmitter<IRune | TRune> = new EventEmitter<IRune | TRune>();

    constructor(public readonly runeHelper: RuneHelper) {
    }

    public change(rune: IRune | TRune): void {
        this.onChange.emit(rune);
    }
}
