import {createReducer , on} from '@ngrx/store'
import { toggle } from './Theme.actions';


const initailState = true;

export const themeReducer = createReducer(initailState ,
  on(toggle , (_state , action) => {
    const html = document.querySelector('html');
    html?.classList.toggle('dark' , action.darkMode);
    console.log('darkMode' , action.darkMode);
    localStorage.setItem('theme', action.darkMode ? 'dark' : 'light');
    return action.darkMode;
  })
);
