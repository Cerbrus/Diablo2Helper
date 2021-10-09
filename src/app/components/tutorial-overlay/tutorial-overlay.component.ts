import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ITutorialStep } from '../../interfaces/tutorial';
import { TutorialService } from '../../services/tutorial.service';

@Component({
    selector: 'tutorial-overlay',
    templateUrl: './tutorial-overlay.component.html',
    styleUrls: ['./tutorial-overlay.component.scss']
})
export class TutorialOverlayComponent {
    private currentStep?: ITutorialStep;

    @ViewChild('tutorialOverlay')
    public overlayElement?: ElementRef<HTMLDivElement>;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private readonly translate: TranslateService,
        private readonly renderer: Renderer2,
        private readonly tutorialService: TutorialService
    ) {
        tutorialService.registerOverlay(this);
    }

    public showTutorialStep(step: ITutorialStep): TutorialOverlayComponent {
        if (!step)
            return this;

        this.currentStep = step;

        return this
            .overlayForStepElement()
            .toggleOverlay(true);
    }

    public closeTutorial(): TutorialOverlayComponent {
        delete this.currentStep;
        return this.toggleOverlay(false);
    }

    public nextTutorialStep(): void {
        const next = this.tutorialService.currentStep + 1;
        this.tutorialService.showStep(next);
    }

    public previousTutorialStep(): void {
        const next = this.tutorialService.currentStep - 1;
        this.tutorialService.showStep(next);
    }

    private overlayForStepElement(): TutorialOverlayComponent {
        const element = this.currentStep?.anchor?.elementRef.nativeElement;
        this.createOverlayClip(element?.getBoundingClientRect());
        return this;
    }

    private createOverlayClip(rect?: DOMRect): TutorialOverlayComponent {
        const overlay = this.overlayElement?.nativeElement;
        if (!overlay)
            return this;

        if (rect) {
            const { x, y, width, height } = rect;
            const w = `${x + width}px`;
            const h = `${y + height}px`;

            overlay.style.clipPath = `polygon(0% 0%, 0% 100%, ${x}px 100%, ${x}px ${y}px, ${w} ${y}px, ${w} ${h}, ${x}px ${h}, ${x}px 100%, 100% 100%, 100% 0%)`;
        } else {
            overlay.style.clipPath = 'none';
        }

        return this;
    }

    private toggleOverlay(show: boolean): TutorialOverlayComponent {
        console.log('toggleOverlay', this.overlayElement);
        const overlay = this.overlayElement?.nativeElement?.classList;
        if (!overlay)
            return this;

        show ? overlay.remove('hidden')
            : overlay.add('faded');
        window.setTimeout(() => {
            show ? overlay.remove('faded')
                : overlay.add('hidden');
        });

        return this;
    }
}
