import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Avatar } from 'primeng/avatar';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Carousel } from 'primeng/carousel';

import { UserPost } from '../../Types/User';
@Component({
  selector: 'app-post-card',
  imports: [Avatar, Card, Button, Carousel, CommonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  postInput = input<UserPost>();
  //for red color
  likeButtonSeverity: 'secondary' | 'danger' = 'secondary';
  // when liked the icon becomes filled
  likeIcon: 'pi pi-heart' | 'pi pi-heart-fill' = 'pi pi-heart';
  /**
   * @returns value of the signal
   */
  get post(): UserPost | undefined {
    return this.postInput();
  }
  /**
   * @returns value of the post
   */
  get group(): UserPost['group'] | undefined {
    return this.post?.group;
  }
  /**
   * images link
   */
  get images(): string[] | undefined {
    return this.post?.images ? this.post.images : undefined;
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
}
