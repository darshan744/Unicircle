import { createAction, props } from '@ngrx/store';
import { UserPost } from '../../Types/User';

export const initPost = createAction('[Post] INIT');

export const setPosts = createAction(
  '[Post] SET',
  props<{ value: UserPost[] }>()
);
