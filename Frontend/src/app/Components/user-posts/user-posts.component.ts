import { Component, OnInit } from '@angular/core';
import { PostService } from '../../Service/Post/post.service';
import { UserPost } from '../../Types/User';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-user-posts',
  imports: [CommonModule , Button, Card],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css',
})
export class UserPostsComponent implements OnInit {
  // array containing posts
  posts: Observable<Array<UserPost>> = new Observable();

  constructor(private service: PostService) {}

  ngOnInit(): void {
    this.posts = this.service
      .getUserPost()
      .pipe(map((postResponse) => postResponse.data.posts));
  }
}
