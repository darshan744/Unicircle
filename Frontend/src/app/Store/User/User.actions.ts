import { createAction, props } from '@ngrx/store';

import { LoginUser } from '../../Types/Auth';

export const setUser = createAction(
  '[User] SET',
  props<{ value: LoginUser }>()
);
