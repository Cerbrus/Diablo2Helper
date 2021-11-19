// Angular modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// External modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ResizeObserverModule } from '@ng-web-apis/resize-observer';
import { TranslateModule } from '@ngx-translate/core';
import { NG_EVENT_PLUGINS } from '@tinkoff/ng-event-plugins';

// Directives
import {
    KeyboardShortcutDirective,
    MaxDirective,
    MinDirective,
    OnClickSelectDirective,
    TooltipSocketableDirective,
    VarDirective
} from './directives';

// Pipes
import { AsArrayPipe, KeyValueTypedPipe } from './pipes';

const directives = [
    KeyboardShortcutDirective,
    MaxDirective,
    MinDirective,
    OnClickSelectDirective,
    TooltipSocketableDirective,
    VarDirective
];
const pipes = [AsArrayPipe, KeyValueTypedPipe];
const modules = [BrowserModule, CommonModule, FontAwesomeModule, FormsModule, ResizeObserverModule, TranslateModule];

@NgModule({
    declarations: [directives, pipes],
    imports: [modules],
    exports: [directives, pipes, modules],
    providers: [NG_EVENT_PLUGINS]
})
export class SharedModule {}
