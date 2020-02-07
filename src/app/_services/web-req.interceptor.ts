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

  refreshingAccessToken: boolean;
  accessTokenRefreshed: Subject<any> = new Subject();

  intercept(requst: HttpRequest<any>, next: HttpHandler): Observable<any> {
    //add headers to request
    requst = this.addAuthHeader(requst);
    //call next() and try to authenticate
    return next.handle(requst).pipe(
      catchError((err: HttpErrorResponse) => {
        //if unauthorized, try to refresh access token
        if(err.status === 401) {
          //401 status means that user is not authenticated
          //call logout function to refresh access token
          return this.refreshAccessToken()
            .pipe(
              switchMap(() => {
                requst = this.addAuthHeader(requst);
                return next.handle(requst);
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

  addAuthHeader(requst: HttpRequest<any>) {
    //get access token
    const accessToken = this._authService.getAccessToken();
    if(accessToken) {
      //append access token to the request header
      return requst.clone({
        setHeaders: {
          'x-access-token': accessToken
        }
      });
    }
    return requst;
  }

  refreshAccessToken() {
    if(this.refreshingAccessToken) {
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