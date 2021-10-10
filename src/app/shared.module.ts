import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OnClickSelectDirective } from './directives/on-click-select/on-click-select.directive';
import { TooltipSocketableDirective } from './directives/tooltip-socketable/tooltip-socketable.directive';
import { VarDirective } from './directives/var/var.directive';

const directives = [
    OnClickSelectDirective,
    TooltipSocketableDirective,
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
