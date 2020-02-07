import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) { }

  refreshingAccessToken: boolean = false;
  accessTokenRefreshed: Subject<any> = new Subject();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addAuthHeader(req);
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401) {
          //401 status means that user is not authenticated
          //call logout function to refresh access token
          return this.refreshAccessToken()
            .pipe(
              switchMap(() => {
                req = this.addAuthHeader(req);
                return next.handle(req);
              }),
              catchError((err: any) => {
                this._authService.logout();
                return empty();
              })
            )
        }
        return throwError(err);
      })
    )
  }

  addAuthHeader(req: HttpRequest<any>) {
    //get access token
    const accessToken = this._authService.getAccessToken();
    if(accessToken) {
      //append access token to the request header
      return req.clone({
        setHeaders: {
          'x-access-token': accessToken
        }
      });
    }
    return req;
  }

  refreshAccessToken() {
    if(this.refreshAccessToken) {
      return new Observable(observer => {
        this.accessTokenRefreshed.subscribe(() => {
          //this code runs if access token is refreshed
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshingAccessToken = true;
      return this._authService.getNewAccessToken().pipe(
        tap(() => { 
          this.refreshingAccessToken = false;
          console.log('Access Token Refreshed!');
          this.accessTokenRefreshed.next();
        })
      );
    }
  }
}