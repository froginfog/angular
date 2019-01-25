import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalEventService {
  public showLoading: Subject<boolean> = new Subject<boolean>();
  // public islogin: Subject<boolean> = new Subject<boolean>();

  constructor() { }
}
