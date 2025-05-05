import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../../ToastService/toast.service';
import { catchError, throwError } from 'rxjs';
import IBaseResponse from '../../../Types/Response';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  return next(req).pipe(
    catchError((error : HttpErrorResponse) => {
      toast.showToast("Error" , error.error.message || "Somthing wrong in Server" , "error");
      throw error;
    })
  );
};
