import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

import {backend} from '../backend';
import {Info} from './info';

const api = backend;

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  info: Info;

  constructor(private http: HttpClient) { }

  getInfo(): Observable<Info> {
    return this.http.get<Info>(api.siteinfo).pipe(
      catchError(err => {
        return of(err);
      })
    );
  }
}
