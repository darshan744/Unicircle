import { createReducer, on } from '@ngrx/store';
import { GroupPostsResponse, UserPost } from '../../Types/User';
import { groupPosts, setGroupPosts, setPosts } from './Post.actions';

const initialState: UserPost[] = new Array();
export const postReducer = createReducer(
  initialState,
  on(setPosts, (_, actions) => actions.value),
);
export const groupPostReducer = createReducer(
  new Array<GroupPostsResponse>(),
  on(setGroupPosts, (_, actions) => actions.value)
)
