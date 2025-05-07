import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { MessageService } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './Service/Interceptors/Auth/auth.interceptor';
import { errorInterceptor } from './Service/Interceptors/Error/error.interceptor';
import { provideQuillConfig } from 'ngx-quill/config';
import quillToobarConfig from './Utils/QuillConfig';
import { provideStore } from '@ngrx/store'
import { themeReducer } from './Store/Theme/Theme.reducer';
export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    providePrimeNG({
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: '.dark',
            },
        },
    }),
    provideQuillConfig({
        modules: {
            toolbar: quillToobarConfig,
        },
    }),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideStore({
      theme : themeReducer
    })
],
};
