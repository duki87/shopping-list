import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private _http: HttpClient) { 
    this.ROOT_URL = 'http://localhost:3000';
  }

  get(url: string) {
    return this._http.get<any>(`${this.ROOT_URL}/${url}`);
  }

  post(url: string, payload: Object) {
    return this._http.post<any>(`${this.ROOT_URL}/${url}`, payload);
  }

  patch(url: string, payload: Object) {
    return this._http.patch(`${this.ROOT_URL}/${url}`, payload);
  }

  delete(url: string) {
    return this._http.delete(`${this.ROOT_URL}/${url}`);
  }

  login(userData: object) {
    return this._http.post(`${this.ROOT_URL}/users/login`, userData, {
        observe: 'response'
      });
      //{ observe: 'response' is added in order to return get full response }
  }
}
