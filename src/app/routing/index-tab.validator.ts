import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../environments/environment';
import { CanActivateBase } from './base-validator';

@Injectable()
export class CanActivateIndexTab extends CanActivateBase {
    constructor(router: Router) {
        super(router);
    }

    protected validateRoute(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const tab = route.params.tab;
        return tab === 'dev'
            ? !environment.production
            : ['runewords', 'runes', 'gems', 'import', 'settings']
                .includes(tab);
    }
}
