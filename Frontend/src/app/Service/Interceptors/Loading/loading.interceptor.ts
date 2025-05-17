import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../LoadingService/loading.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  // load when calling a request
  loadingService.loadComponent();
  // hide after call finished
  return next(req).pipe(finalize(() => loadingService.hideLoadingComponent()));
};
