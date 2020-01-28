import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, pluck, shareReplay } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { WebRequestService } from './web-request-service.service';
import { User } from '../_models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _webService: WebRequestService, private _router: Router) { }

  login(userData: object) {
    return this._webService.login(userData)
    .pipe(
      //shareReplay(),
      tap((res: HttpResponse<any>) => {
        //the auth tokens will be in the header of the response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
      }),
      catchError(this.errorHandler)
    );
  }

  logout() {
    this.removeSession();
  }

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('_id', userId);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('_id');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  setAccessToken(accessToken: string) {
    return localStorage.setItem('x-access-token', accessToken);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
