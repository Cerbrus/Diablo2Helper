import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../environments/environment';
import { ParameterValidatorBase } from './parameter-base.validator';

@Injectable()
export class ParameterTab extends ParameterValidatorBase {
    private readonly tabs: Record<string, Array<string>> = {
        '': ['runewords', 'runes', 'gems', 'import', 'settings']
    };

    constructor(router: Router) {
        super(router);
    }

    protected validateRoute(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const tabParam = route.params.tab;
        if (!tabParam)
            return false;

        const [tabsName, tabKey] = tabParam.split(':');

        return tabsName === '' && tabKey === 'dev'
            ? !environment.production
            : this.tabs[tabsName]?.includes(tabKey);
    }
}
