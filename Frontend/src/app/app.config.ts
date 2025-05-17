import {
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { MessageService } from 'primeng/api';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

import { themeReducer } from './Store/Theme/Theme.reducer';
import { ToggleEffects } from './Store/Theme/Theme.effects';
import { GroupEffects } from './Store/Groups/Group.effects';
import { groupReducer } from './Store/Groups/Group.reducer';

import { authInterceptor } from './Service/Interceptors/Auth/auth.interceptor';
import { errorInterceptor } from './Service/Interceptors/Error/error.interceptor';
import { loadingInterceptor } from './Service/Interceptors/Loading/loading.interceptor';
import { PostEffect } from './Store/Post/Post.effects';
import { postReducer } from './Store/Post/Post.reducer';
import { userReducer } from './Store/User/User.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    // provideExperimentalZonelessChangeDetection(),
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
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([loadingInterceptor, authInterceptor, errorInterceptor])
    ),
    provideStore({
      theme: themeReducer,
      group: groupReducer,
      posts : postReducer,
      user : userReducer
    }),
    provideEffects([ToggleEffects, GroupEffects, PostEffect]),
  ],
};
