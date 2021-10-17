import { Type } from '@angular/core';
import { ITabOptions } from './ITabOptions';
import { ITabPaneComponent } from './ITabPaneComponent';

export interface ITab {
    component: Type<ITabPaneComponent>;
    options: ITabOptions;
    cssClass?: string;
    hide?: boolean;
}
