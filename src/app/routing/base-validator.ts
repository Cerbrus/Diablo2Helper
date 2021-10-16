import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export abstract class CanActivateBase implements CanActivate {
    protected constructor(private readonly router: Router) {
    }

    protected abstract validateRoute(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isValid = this.validateRoute(route, state);
        if (!isValid) {
            // noinspection JSIgnoredPromiseFromCall
            this.router.navigateByUrl('/');
        }

        return isValid;
    }
}
