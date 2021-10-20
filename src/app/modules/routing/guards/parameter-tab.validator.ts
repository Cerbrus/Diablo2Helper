import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { environment } from '~environment';
import { ParameterValidatorBase } from './parameter-base.validator';

@Injectable()
export class ParameterTab extends ParameterValidatorBase {
    private readonly tabs: Record<string, Array<string>> = {
        '': ['runewords', 'runes', 'gems', 'import', 'settings']
    };

    constructor(router: Router) {
        super(router);
    }

    protected validateRoute(route: ActivatedRouteSnapshot): boolean {
        const tabParam = route.params.tab;
        if (!tabParam) return false;

        const [tabsName, tabKey] = tabParam.split(':');

        return tabsName === '' && tabKey === 'dev' ? !environment.production : this.tabs[tabsName]?.includes(tabKey);
    }
}
