import { Directive, ElementRef, Input } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';

@Directive({
    selector: '[tutorialAnchor]'
})
export class TutorialAnchorDirective {
    public get index(): number {
        return this.step;
    }

    @Input('tutorialAnchor')
    public set index(value: number) {
        this.step = value;
        this.tutorialService.registerAnchor(this);
    }

    private step!: number;

    constructor(
        public readonly elementRef: ElementRef,
        private readonly tutorialService: TutorialService
    ) {
    }
}
