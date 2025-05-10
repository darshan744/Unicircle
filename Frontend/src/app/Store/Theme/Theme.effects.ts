import { inject, Injectable } from '@angular/core';
import { toggle } from './Theme.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class ToggleEffects {
  actions = inject(Actions);
  toggleEffect = createEffect(
    () =>
      this.actions.pipe(
        ofType(toggle),
        tap((action) => {
          const html = document.querySelector('html');
          html?.classList.toggle('dark', action.darkMode);
          console.log('darkMode', action.darkMode);
          localStorage.setItem('theme', action.darkMode ? 'dark' : 'light');
        })
      ),
    { dispatch: false }
  );
}
