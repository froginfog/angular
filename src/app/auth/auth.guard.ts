import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import {GlobalEventService} from '../global-event.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLogin: boolean;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this.globalservice.islogin.subscribe((login: boolean) => {
    // })
    const login = sessionStorage.getItem('islogin');
    if (login === '1') {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  constructor(private router: Router, private globalservice: GlobalEventService) {}
}
