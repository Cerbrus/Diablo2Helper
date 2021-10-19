import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { IssueTypes } from '../../../types';
import { ParameterValidatorBase } from './parameter-base.validator';

@Injectable()
export class ParameterIssueType extends ParameterValidatorBase {
    constructor(router: Router) {
        super(router);
    }

    protected validateRoute(route: ActivatedRouteSnapshot) {
        return IssueTypes.includes(route.params.issueType);
    }
}
