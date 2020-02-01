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

  constructor(private _http: HttpClient,private _webService: WebRequestService, private _router: Router) { }

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
    this._router.navigate(['/login']);
  }

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('_id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('_id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('_id');
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

  getNewAccessToken() {
    return this._http.get(`${this._webService.ROOT_URL}/users/me/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken(),
        '_id': this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => { this.setAccessToken(res.headers.get('x-access-token')) })
    )
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
