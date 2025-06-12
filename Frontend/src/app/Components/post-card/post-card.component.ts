import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Avatar } from 'primeng/avatar';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Carousel } from 'primeng/carousel';

import { GroupPostsResponse, UserPost } from '../../Types/User';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-post-card',
  imports: [Avatar, Card, Button, Carousel, CommonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  postInput = input<UserPost | GroupPostsResponse>();
  //for red color
  likeButtonSeverity: 'secondary' | 'danger' = 'secondary';
  // when liked the icon becomes filled
  likeIcon: 'pi pi-heart' | 'pi pi-heart-fill' = 'pi pi-heart';
  /**
   * @returns value of the signal
   */
  get post(): UserPost | GroupPostsResponse | undefined {
    return this.postInput();
  }
  /**
   * @returns value of the post
   */
  get group(): UserPost['group'] | undefined {
    return this.post && 'group' in this.post ? this.post.group : undefined;
  }
  /**
   * images link
   */
  get images(): string[] | undefined {
    return this.post?.images ? this.post.images : undefined;
  }
  isUserPost(post: UserPost | GroupPostsResponse | undefined): post is UserPost {
    return (post as UserPost).group !== undefined
  }
  isGroupPost(post: UserPost | GroupPostsResponse | undefined): post is GroupPostsResponse {
    return !(this.isUserPost(post));
  }
  /**
   * @description When liked will convert to a
   */
  likeAction(): void {
    this.likeIcon =
      this.likeIcon === 'pi pi-heart' ? 'pi pi-heart-fill' : 'pi pi-heart';
    this.likeButtonSeverity =
      this.likeButtonSeverity === 'secondary' ? 'danger' : 'secondary';
  }
  /**
   * @description Navigates to sibling route post/:id
   * @note To navigate to sibling must use current route's parent property since current is a
   * children . Hence by getting the parent relative to that is the sibling(i.e post)
   */
  count = signal(0)
  comment(): void {
    this.router.navigate(['posts', this.post?.id], {
      relativeTo: this.route.parent,
      queryParams: { comment: true }
    });
  }
}
