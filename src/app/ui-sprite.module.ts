import { NgModule } from '@angular/core';

// Components
import { UiSpriteAnimatedComponent } from './components/ui-sprite/ui-sprite-animated/ui-sprite-animated.component';
import { UiSpriteGemComponent } from './components/ui-sprite/ui-sprite-gem/ui-sprite-gem.component';
import { UiSpriteRuneComponent } from './components/ui-sprite/ui-sprite-rune/ui-sprite-rune.component';
import { UiSpriteSkillComponent } from './components/ui-sprite/ui-sprite-skill/ui-sprite-skill.component';

// Pipes
import { AsArrayPipe } from './pipes/as-array.pipe';
import { KeyValueTypedPipe } from './pipes/key-value-typed.pipe';
import { SharedModule } from './shared.module';

const components = [
    UiSpriteAnimatedComponent,
    UiSpriteGemComponent,
    UiSpriteRuneComponent,
    UiSpriteSkillComponent
];

const pipes = [
    AsArrayPipe,
    KeyValueTypedPipe
];

@NgModule({
    declarations: [
        components,
        pipes
    ],
    imports: [
        SharedModule
    ],
    exports: [
        components,
        pipes
    ]
})
export class UiSpriteModule {
}
