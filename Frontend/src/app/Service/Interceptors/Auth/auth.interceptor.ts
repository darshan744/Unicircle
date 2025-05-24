import {
  HttpClient,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import environment from '../../../../environments/environment.development';
import { Router } from '@angular/router';

/**
 * @description when calling a route check for 401 response
 * if 401 found then check whether its for getting refreshtoken
 * if true then logout because refresh token is expired
 * if not then hit the request useing the next(req)
 * next(req) => will create a new Obsevable chain and calls the request
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // if 401 retry
      const number = err.status;
      if (number === 401) {
        // if refresh token responds 401 pass to next interceptor
        // then the catchError in token observable logsout user
        const refreshUrl = `${environment.api}/auth/refresh-token`
        if (req.url === refreshUrl) {
          return next(req);
        }
        return http
          .get(refreshUrl, { withCredentials: true })
          .pipe(
            //after getting we pass it to the next handler
            switchMap(() => next(req)),
            // incase if the refreshtoken itself gives an error
            // then throw that error
            catchError((refreshTokenError) => {
              router.navigate([''], { replaceUrl: true });
              return throwError(() => refreshTokenError);
            })
          );
      } else {
        return throwError(() => err);
      }
    })
  );
};
