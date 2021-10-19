// Angular modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Custom modules
import { SharedModule } from '../';

// Components
import {
    UiCollapsibleComponent,
    UiFormatEffectComponent,
    UiScrollableComponent,
    UiSpriteAnimatedComponent,
    UiSpriteClassComponent,
    UiSpriteGemComponent,
    UiSpriteRuneComponent,
    UiSpriteSkillComponent,
    UiTabComponent,
    UiTableHeadComponent,
    UiTableRecordComponent,
    UiTableSortControlComponent,
    UiTabsComponent
} from './components';

// Directives
import { UiDraggableDirective } from './directives';

const components = [
    UiCollapsibleComponent,
    UiFormatEffectComponent,
    UiScrollableComponent,
    UiSpriteAnimatedComponent,
    UiSpriteClassComponent,
    UiSpriteGemComponent,
    UiSpriteRuneComponent,
    UiSpriteSkillComponent,
    UiTabComponent,
    UiTableHeadComponent,
    UiTableRecordComponent,
    UiTableSortControlComponent,
    UiTabsComponent
];

const directives = [
    UiDraggableDirective
];

@NgModule({
    declarations: [
        components,
        directives
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        components,
        directives
    ]
})
export class UiModule {
}
