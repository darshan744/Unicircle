import { createReducer, on } from '@ngrx/store';

import { LoginUser } from '../../Types/Auth';
import { setUser } from './User.actions';
const initialState: LoginUser = {} as LoginUser;
export const userReducer = createReducer(
  initialState,
  on(setUser, (_, action) => action.value)
);
