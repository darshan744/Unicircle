import { createReducer, on } from '@ngrx/store';
import { getGroup, setGroup } from './Group.actions';
import { UserGroup } from '../../Types/User';

const initailState: UserGroup[] = [];
const groupReducer = createReducer(
  initailState,
  on(getGroup, (state) => state),
  on(setGroup, (_state, actions) => actions.value)
);
export { groupReducer };
