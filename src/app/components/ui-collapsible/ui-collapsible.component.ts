import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PullProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { StorageService } from '../../services';

@Component({
    selector: 'ui-collapsible',
    templateUrl: './ui-collapsible.component.html',
    styleUrls: ['./ui-collapsible.component.scss']
})
export class UiCollapsibleComponent implements AfterViewInit {
    @Input()
    public title!: string;

    @Input()
    public collapsed = false;

    @Input('pullIcon')
    public pull: PullProp = 'right';

    public collapseMargin: string | 0 = 0;
    public icon = faAngleDoubleDown;

    public afterInit = false;

    @ViewChild('wrapper')
    private wrapper!: ElementRef<HTMLDivElement>;

    constructor(private readonly storageService: StorageService) {
    }

    public ngAfterViewInit(): void {
        const collapsed = this.storageService.get
            .uiCollapsibleState()[this.title];
        this.setState(collapsed ?? false);
        this.afterInit = true;
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

        this.saveState();
    }

    private saveState(): void {
        const state = this.storageService.get
            .uiCollapsibleState();
        state[this.title] = this.collapsed;
        this.storageService.save.uiCollapsibleState(state);
    }
}
