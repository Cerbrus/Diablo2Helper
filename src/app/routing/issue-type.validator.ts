import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CanActivateBase } from './base-validator';

@Injectable()
export class CanActivateIssueType extends CanActivateBase {
    constructor(router: Router) {
        super(router);
    }

    protected validateRoute(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return ['bug_report', 'feature_request'].includes(route.params.issueType);
    }
}
