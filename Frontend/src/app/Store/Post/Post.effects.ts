import { inject, Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { initPost, setPosts } from './Post.actions';
import { PostService } from '../../Service/Post/post.service';
import { map, switchMap } from 'rxjs';

@Injectable()
export class PostEffect {
  actions = inject(Actions);
  constructor(private postService: PostService) {}
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
}
