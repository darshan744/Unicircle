import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../../ToastService/toast.service';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // every series except 2xx is considers error
      // hence it will call it
      // but we don't have to call toast for that
      if (error.status !== 401) {
        toast.showToast(
          'Error',
          error.error.message || 'Somthing wrong in Server',
          'error'
        );
      }
      throw error;
    })
  );
};
