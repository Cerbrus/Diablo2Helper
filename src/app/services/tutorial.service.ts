import { Injectable } from '@angular/core';
import { TutorialOverlayComponent } from '../components/tutorial-overlay/tutorial-overlay.component';
import { TutorialAnchorDirective } from '../directives/tutorial-anchor/tutorial-anchor.directive';
import { ITutorialStep } from '../interfaces/tutorial';

@Injectable({ providedIn: 'root' })
export class TutorialService {
    public currentStep = 0;

    private overlay!: TutorialOverlayComponent;

    private tutorialAnchors: Array<TutorialAnchorDirective> = [];
    private tutorialSteps: Array<ITutorialStep> = [
        {
            index: 0,
            titleKey: 'labels.test'
        },
        {
            index: 1,
            titleKey: 'labels.test'
        },
        {
            index: 2,
            titleKey: 'labels.test1'
        }
    ];

    public registerOverlay(component: TutorialOverlayComponent): void {
        this.overlay = component;
    }

    public registerAnchor(anchor: TutorialAnchorDirective): void {
        if (this.tutorialAnchors.find(s => s.index === anchor.index)) {
            throw new Error(`Invalid tutorial anchor, an anchor with this ID has already been registered: ${anchor.index}`);
        }

        this.tutorialAnchors.push(anchor);
        const step = this.tutorialSteps.find(s => s.index === anchor.index);
        if (step)
            step.anchor = anchor;
    }

    public startTutorial(): void {
        this.showStep(0);
    }

    public closeTutorial(): void {
        this.currentStep = 0;
        this.overlay.closeTutorial();
    }

    public showStep(index: number): void {
        this.currentStep = index;
        const step = this.tutorialSteps.find(s => s.index === this.currentStep);

        step
            ? this.overlay.showTutorialStep(step)
            : this.overlay.closeTutorial();
    }
}
