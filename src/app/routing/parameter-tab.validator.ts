import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../environments/environment';
import { ParameterValidatorBase } from './parameter-base.validator';

@Injectable()
export class ParameterTab extends ParameterValidatorBase {
    constructor(router: Router) {
        super(router);
    }

    protected validateRoute(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const tab = route.params.tab;
        if (!tab)
            return false;

        let [name, key] = tab.split(':');
        const tabs: Record<string, Array<string>> = {
            '': ['runewords', 'runes', 'gems', 'import', 'settings']
        };

        return name === '' && tab === 'dev'
            ? !environment.production
            : tabs[name]?.includes(key);
    }
}
