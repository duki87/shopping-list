import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanAccessGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this._authService.verifyToken().toPromise()
      .then(
        (res) => {
          console.log(res)
          if(res.status == 401) {
            return false;
          }       
        }
      ).catch((err) => {
        console.log(err)
        this._router.navigate(['/login']); 
        return false; 
      }) 
    }
}
