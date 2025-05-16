import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Avatar } from 'primeng/avatar';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Carousel } from 'primeng/carousel';

import { UserPost } from '../../Types/User';

@Component({
  selector: 'app-post',
  imports: [Avatar, Card, Button, Carousel, CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  postInput = input<UserPost>();

  likeButtonSeverity: 'secondary' | 'danger' = 'secondary';
  likeIcon: 'pi pi-heart' | 'pi pi-heart-fill' = 'pi pi-heart';
  get post(): UserPost | undefined {
    return this.postInput();
  }
  get group(): UserPost['group'] | undefined {
    return this.post?.group;
  }
  get images(): string[] | undefined {
    return this.post?.images ? this.post.images : undefined;
  }

  likeAction(): void {
    this.likeIcon =
      this.likeIcon === 'pi pi-heart' ? 'pi pi-heart-fill' : 'pi pi-heart';
    this.likeButtonSeverity =
      this.likeButtonSeverity === 'secondary' ? 'danger' : 'secondary';
  }

  ngOnInit(): void {
    console.log(this.post?.title);
    console.log(this.postInput()?.images);
  }
}
