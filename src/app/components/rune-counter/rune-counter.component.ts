import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RuneHelper } from '~helpers';
import { IRune } from '~interfaces/rune';
import { RuneTrackerService } from '~services';

@Component({
    selector: 'rune-counter',
    templateUrl: './rune-counter.component.html',
    styleUrls: ['./rune-counter.component.scss']
})
export class RuneCounterComponent {
    @Input()
    public rune!: IRune;

    public min: number;
    public max: number;

    @Output()
    public onChange: EventEmitter<IRune> = new EventEmitter<IRune>();

    constructor(private readonly runeTracker: RuneTrackerService, private readonly runeHelper: RuneHelper) {
        this.min = runeTracker.min;
        this.max = runeTracker.max;
    }

    public add(number: number): void {
        this.rune = this.runeHelper.asItem(this.rune);
        this.rune.owned = (this.rune.owned ?? 0) + number;
        this.runeTracker.clampCount(this.rune);
        this.runeTracker.saveStoredRunes();
        this.onChange.emit(this.rune);
    }

    public onCountChange(): void {
        this.runeTracker.clampCount(this.rune);
        this.onChange.emit(this.runeHelper.asItem(this.rune));
    }
}
