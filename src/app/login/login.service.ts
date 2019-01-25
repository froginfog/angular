import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, throttleTime} from 'rxjs/operators';

import {backend} from '../backend';
import {ImageCode} from './image-code';
import {LoginReponse} from './login-reponse';
import {LoginInfo} from './login-info';

const api = backend;
const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getVerifyCode(): Observable<ImageCode> {
    return this.http.get<ImageCode>(api.verifycode).pipe(
      catchError((err) => {
        return of(err);
      })
    );
  }

  sendLoginInfo(logininfo: LoginInfo): Observable<LoginReponse> {
    return this.http.post<LoginInfo>(api.userLogin, logininfo, options).pipe(
      catchError(err => {
        return of(err);
      })
    );
  }
}
