import { inject, Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { groupPosts, initPost, setGroupPosts, setPosts } from './Post.actions';
import { PostService } from '../../Service/Post/post.service';
import { map, switchMap } from 'rxjs';
import { setGroup } from '../Groups/Group.actions';

@Injectable()
export class PostEffect {
  actions = inject(Actions);
  constructor(private postService: PostService) { }
  postEffect = createEffect(() =>
    this.actions.pipe(
      ofType(initPost),
      switchMap(() =>
        this.postService
          .getUserPost()
          .pipe(map((res) => setPosts({ value: res.data.posts })))
      )
    )
  );
  loadGroupPostEffect = createEffect(
    () => this.actions.pipe(
      ofType(groupPosts),
      switchMap(
        ({ groupId }) =>
          this.postService.getGroupPosts(groupId)
            .pipe(
              map((res) => res.data),
              map((res) => setGroupPosts({ value: res }))
            )
      )
    )
  )
}
