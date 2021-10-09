import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OnClickSelectDirective } from './directives/on-click-select/on-click-select.directive';
import { TooltipSocketableDirective } from './directives/tooltip-socketable/tooltip-socketable.directive';
import { TutorialAnchorDirective } from './directives/tutorial-anchor/tutorial-anchor.directive';
import { VarDirective } from './directives/var/var.directive';

const directives = [
    OnClickSelectDirective,
    TooltipSocketableDirective,
    TutorialAnchorDirective,
    VarDirective
];

@NgModule({
    declarations: [directives],
    imports: [CommonModule],
    exports: [
        directives,
        CommonModule
    ]
})
export class SharedModule {
}
