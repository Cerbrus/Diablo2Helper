import { Component, ViewEncapsulation } from '@angular/core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { TutorialService } from '../../services/tutorial.service';
import { ButtonBaseComponent } from '../buttons/button-base.component';

@Component({
    selector: 'button-tutorial',
    templateUrl: './button-tutorial.component.html',
    styleUrls: ['./button-tutorial.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ButtonTutorialComponent extends ButtonBaseComponent {
    public icon = faQuestion;

    constructor(private readonly tutorialService: TutorialService) {
        super();
    }

    protected onClick($event: MouseEvent): void {
        this.tutorialService.startTutorial();
    }
}
