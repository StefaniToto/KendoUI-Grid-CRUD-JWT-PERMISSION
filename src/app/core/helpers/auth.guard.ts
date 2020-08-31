import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/auth';
import { PermissionManagerService } from '../services/permissions/global.service';
import { Role } from '../models/ERoles';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private userS: PermissionManagerService
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // logged in so return true      
            this.userS.authAs(currentUser.RoleId as Role);
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { relativeTo: this.route });
        return false;
    }
}