import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../../ToastService/toast.service';
import { catchError } from 'rxjs';
/**
 * @note on Interceptors
 * The cycle of interceptors is just on the request cycle i.e after http.get()
 * The  interceptor functions activate then we are calling the next() which
 * is the following interceptors and waiting for their observable response
 * The cycle goes on and we wait for the final response (Observable) from
 * HttpBackend
 * Example in here Interceptors are in the order of loading -> auth -> error
 * so fist loading's loadingservice.loadcomponent() runs and then it return a result
 * of the function next which then is passed to auth and then to error
 * After error it returns to HttpBackend where the backend call for the
 * Api is executed.Then the response is created as observable and
 * then returned to the caller i.e error -> auth -> loading -> service -> component
 *
 * */
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
