import { createAction, props } from '@ngrx/store';
import { GroupPostsResponse, UserPost } from '../../Types/User';

export const initPost = createAction('[Post] INIT');

export const setPosts = createAction(
  '[Post] SET',
  props<{ value: UserPost[] }>()
);
export const groupPosts = createAction("[Post] GET GROUPPOST", props<{ groupId: string }>())
export const setGroupPosts = createAction("[Posts] SET GROUPPOST", props<{ value: GroupPostsResponse[] }>())
