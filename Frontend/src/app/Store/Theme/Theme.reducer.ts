import {createReducer , on} from '@ngrx/store'
import { toggle } from './Theme.actions';


const initailState = true;

export const themeReducer = createReducer(initailState ,
  on(toggle , (_state , action) => {
    return action.darkMode;
  })
);
