import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class MyInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const myReq = req.clone({
      // headers: req.headers.set('Content-Type', 'application/x-www-form-urlencoded'),
      withCredentials: true
    });

    return next.handle(myReq).pipe(
      catchError((resp: HttpErrorResponse) => {
        if (resp.status === 401) {
          this.router.navigate(['/login']);
        }
        return throwError(resp);
      })
    );
  }
}
