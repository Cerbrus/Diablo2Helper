import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PullProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'ui-collapsible',
    templateUrl: './ui-collapsible.component.html',
    styleUrls: ['./ui-collapsible.component.scss']
})
export class UiCollapsibleComponent {
    @Input()
    public title!: string;

    @Input()
    public collapsed = false;

    @Input('pullIcon')
    public pull: PullProp = 'right';

    @ViewChild('wrapper')
    private wrapper!: ElementRef<HTMLDivElement>;

    public collapseMargin: string | 0 = 0;
    public icon = faAngleDoubleDown;

    public toggle(): void {
        if (!this.wrapper)
            return;

        this.collapsed = !this.collapsed;
        this.collapseMargin = this.collapsed
            ? `-${this.wrapper.nativeElement.clientHeight}px`
            : 0;
    }
}
