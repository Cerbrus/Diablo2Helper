import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PullProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../../services';
import { LabeledBaseComponent } from '../../labeled-base.component';

@Component({
    selector: 'ui-collapsible',
    templateUrl: './ui-collapsible.component.html',
    styleUrls: ['./ui-collapsible.component.scss']
})
export class UiCollapsibleComponent extends LabeledBaseComponent implements AfterViewInit {
    @Input()
    public collapsed = false;

    @Input('pullIcon')
    public pull: PullProp = 'right';

    public collapseMargin: string | 0 = 0;
    public icon = faAngleDoubleDown;

    @ViewChild('wrapper')
    private wrapper!: ElementRef<HTMLDivElement>;

    constructor(
        translate: TranslateService,
        private readonly storageService: StorageService
    ) {
        super(translate);
    }

    public ngAfterViewInit(): void {
        const collapsed = this.storageService.get
            .uiCollapsibleState()[this.labelKey ?? this.getLabel()];
        this.setState(collapsed ?? false);
    }

    public toggle(): void {
        if (!this.wrapper)
            return;

        this.setState(!this.collapsed);
    }

    private setState(newState: boolean): void {
        this.collapsed = newState;

        this.collapseMargin = this.collapsed
            ? `-${this.wrapper.nativeElement.clientHeight}px`
            : 0;

        window.setTimeout(() => {
            this.wrapper.nativeElement.style.marginLeft = '0px';
        }, 100);

        this.saveState();
    }

    private saveState(): void {
        const state = this.storageService.get
            .uiCollapsibleState();
        state[this.labelKey ?? this.getLabel()] = this.collapsed;
        this.storageService.save.uiCollapsibleState(state);
    }
}
