import { Component, OnInit } from '@angular/core';
import { PostService } from '../../Service/Post/post.service';
import { UserPost } from '../../Types/User';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Store } from '@ngrx/store';
import StoreType from '../../Store/Store';
import { Avatar } from 'primeng/avatar';

@Component({
  selector: 'app-user-posts',
  imports: [CommonModule , Button, Card , Avatar],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css',
})
export class UserPostsComponent implements OnInit {
  // array containing posts
  posts: Observable<Array<UserPost>> = new Observable();

  constructor( private store : Store<StoreType>) {}

  ngOnInit(): void {
    this.posts = this.store.select("posts");
  }
}
