import { TutorialAnchorDirective } from '../../directives/tutorial-anchor/tutorial-anchor.directive';

export interface ITutorialStep {
    index: number;
    titleKey: string;
    anchor?: TutorialAnchorDirective
}
