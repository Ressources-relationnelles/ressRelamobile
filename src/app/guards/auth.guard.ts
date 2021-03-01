import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router : Router, private auth :AuthService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    // Rôle demandé pour accéder à la route dans app.routing.module.ts
    const expectedRole = route.data.role;

    // console.log('expected : ', expectedRole);

    return this.auth.user.pipe(
      take(1),
      map(user => {
        // console.log('user in guard', user);
        if (!user) {
          this.router.navigateByUrl('/co');
          return false;
        } else {
          let role = user['role'];
          if (expectedRole == role) {
            return true;
          } else {
            this.router.navigateByUrl('/co');
            return false;
          }
        }
      })
    )
  }

}
