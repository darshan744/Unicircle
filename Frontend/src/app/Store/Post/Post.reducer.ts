import { createReducer, on } from '@ngrx/store';
import { UserPost } from '../../Types/User';
import { setPosts } from './Post.actions';

const initialState: UserPost[] = new Array();
export const postReducer = createReducer(
  initialState,
  on(setPosts, (_, actions) => actions.value)
);
