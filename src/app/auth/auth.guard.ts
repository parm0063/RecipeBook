import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { promise } from "protractor";
import { Observable } from "rxjs";
import { map, take, tap } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot
        ): boolean | UrlTree| Promise<boolean | UrlTree> | Observable<boolean | UrlTree>  {
            return this.authService.user.pipe(
            take(1),  //only take one user, dont have any ongoing subscription
            map(user => {
                const isAuth = !!user;
                if(isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/authenticate']);
            }), 
            // tap(isAuth => {
            //     if(!isAuth) {
            //         this.router.navigate(['/authenticate']);
            //     }
            // })
            );
    }
}